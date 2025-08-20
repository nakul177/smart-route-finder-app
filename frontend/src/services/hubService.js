import {api} from "./rest.js";

export const hubService = {
    // Get all hubs
    async getAllHubs() {
        try {
            const response = await api.get('/hubs');
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch hubs: ${error.response?.data?.message || error.message}`);
        }
    },

    // Create a new hub
    async createHub(hubData) {
        try {
            const response = await api.post('/hubs', hubData);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to create hub: ${error.response?.data?.message || error.message}`);
        }
    },


    // Connect two hubs
    async connectHubs(sourceHubId, targetHubId) {
        try {
            const response = await api.post('/hubs/connect', {
                sourceHubId,
                targetHubId
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to connect hubs: ${error.response?.data?.message || error.message}`);
        }
    },

    // Disconnect two hubs
    async disconnectHubs(a, b) {
        try {
            const response = await api.post('/hubs/disconnect', {
                a,
                b
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to disconnect hubs: ${error.response?.data?.message || error.message}`);
        }
    },

};