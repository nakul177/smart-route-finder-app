import mongoose from "mongoose";
import Hub from "../models/Hub.js";

/** Create a hub */
export const createHub = async (req, res, next) => {
  try {
    const { hubId, name } = req.body;
    if (!hubId || !name) return res.status(400).json({ error: "hubId and name are required" });

    const exists = await Hub.findOne({ hubId });
    if (exists) return res.status(409).json({ error: "hubId already exists" });

    const hub = await Hub.create({ hubId, name });
    res.status(201).json(hub);
  } catch (e) { next(e); }
};

/** List all hubs (also returns simple stats for your UI header) */
export const listHubs = async (_req, res, next) => {
  try {
    const hubs = await Hub.find().sort({ hubId: 1 });
    const connectionsCount = hubs.reduce((sum, h) => sum + h.connections.length, 0);
    const avgPerHub = hubs.length ? +(connectionsCount / hubs.length).toFixed(2) : 0;
    res.json({ hubs, stats: { hubs: hubs.length, connections: connectionsCount, avgPerHub } });
  } catch (e) { next(e); }
};

/** Get a single hub by hubId */
export const getHub = async (req, res, next) => {
  try {
    const hub = await Hub.findOne({ hubId: req.params.hubId });
    if (!hub) return res.status(404).json({ error: "Hub not found" });
    res.json(hub);
  } catch (e) { next(e); }
};

/** Connect two hubs bi-directionally */
export const connectHubs = async (req, res, next) => {
  const { a, b } = req.body; // hubIds
  if (!a || !b) return res.status(400).json({ error: "Provide hubIds a and b" });
  if (a === b) return res.status(400).json({ error: "Cannot connect a hub to itself" });

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [ha, hb] = await Promise.all([
      Hub.findOne({ hubId: a }).session(session),
      Hub.findOne({ hubId: b }).session(session)
    ]);
    if (!ha || !hb) throw new Error("Both hubs must exist");

    if (!ha.connections.includes(b)) ha.connections.push(b);
    if (!hb.connections.includes(a)) hb.connections.push(a);

    await ha.save({ session });
    await hb.save({ session });

    await session.commitTransaction();
    res.json({ message: "Connected", a: ha, b: hb });
  } catch (e) {
    await session.abortTransaction();
    next(e);
  } finally {
    session.endSession();
  }
};

/** Disconnect two hubs bi-directionally */
export const disconnectHubs = async (req, res, next) => {
  const { a, b } = req.body;
  if (!a || !b) return res.status(400).json({ error: "Provide hubIds a and b" });

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [ha, hb] = await Promise.all([
      Hub.findOne({ hubId: a }).session(session),
      Hub.findOne({ hubId: b }).session(session)
    ]);
    if (!ha || !hb) throw new Error("Both hubs must exist");

    ha.connections = ha.connections.filter((x) => x !== b);
    hb.connections = hb.connections.filter((x) => x !== a);

    await ha.save({ session });
    await hb.save({ session });

    await session.commitTransaction();
    res.json({ message: "Disconnected", a: ha, b: hb });
  } catch (e) {
    await session.abortTransaction();
    next(e);
  } finally {
    session.endSession();
  }
};

/** Graph for visualizer (nodes + edges) */
export const getGraph = async (_req, res, next) => {
  try {
    const hubs = await Hub.find({}, { _id: 0, hubId: 1, name: 1, connections: 1 });
    res.json({
      nodes: hubs.map(h => ({ id: h.hubId, label: h.name })),
      edges: hubs.flatMap(h => h.connections.map(c => ({ source: h.hubId, target: c })))
    });
  } catch (e) { next(e); }
};
