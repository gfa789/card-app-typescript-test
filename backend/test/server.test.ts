import { server } from '../src/server';
import { Entry } from '@prisma/client';

describe('Server Routes', () => {
  beforeAll(async () => {
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  describe('GET /get/', () => {
    it('should return all entries', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/get/',
      });

      expect(response.statusCode).toBe(200);
      const entries = JSON.parse(response.payload) as Entry[];
      expect(Array.isArray(entries)).toBe(true);
      if (entries.length > 0) {
        expect(entries[0]).toHaveProperty('id');
        expect(entries[0]).toHaveProperty('title');
        expect(entries[0]).toHaveProperty('description');
        expect(entries[0]).toHaveProperty('created_at');
        expect(entries[0]).toHaveProperty('scheduled_at');
      }
    });
  });

  describe('GET /get/:id', () => {
    it('should return a single entry if it exists', async () => {
      // First, get all entries
      const allEntriesResponse = await server.inject({
        method: 'GET',
        url: '/get/',
      });

      const entries = JSON.parse(allEntriesResponse.payload) as Entry[];
      
      if (entries.length > 0) {
        const firstEntryId = entries[0].id;
        
        const response = await server.inject({
          method: 'GET',
          url: `/get/${firstEntryId}`,
        });

        expect(response.statusCode).toBe(200);
        const entry = JSON.parse(response.payload) as Entry;
        expect(entry).toHaveProperty('id', firstEntryId);
        expect(entry).toHaveProperty('title');
        expect(entry).toHaveProperty('description');
        expect(entry).toHaveProperty('created_at');
        expect(entry).toHaveProperty('scheduled_at');
      }
    });

    it('should return 500 if entry is not found', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/get/non-existent-id',
      });

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.payload)).toEqual({ msg: 'Error finding entry with id non-existent-id' });
    });
  });

  describe('POST /create/', () => {
    it('should create a new entry', async () => {
      const newEntry = {
        title: 'New Test Entry',
        description: 'This is a test description',
        scheduled_at: new Date().toISOString(),
      };

      const response = await server.inject({
        method: 'POST',
        url: '/create/',
        payload: newEntry,
      });

      expect(response.statusCode).toBe(200);
      const createdEntry = JSON.parse(response.payload) as Entry;
      expect(createdEntry).toHaveProperty('id');
      expect(createdEntry).toHaveProperty('title', newEntry.title);
      expect(createdEntry).toHaveProperty('description', newEntry.description);
      expect(createdEntry).toHaveProperty('created_at');
      expect(createdEntry).toHaveProperty('scheduled_at');
    });
  });

  describe('DELETE /delete/:id', () => {
    it('should delete an entry if it exists', async () => {
      // First, create a new entry
      const newEntry = {
        title: 'Entry to Delete',
        description: 'This entry will be deleted',
        scheduled_at: new Date().toISOString(),
      };

      const createResponse = await server.inject({
        method: 'POST',
        url: '/create/',
        payload: newEntry,
      });

      const createdEntry = JSON.parse(createResponse.payload) as Entry;

      // Now, delete the entry
      const deleteResponse = await server.inject({
        method: 'DELETE',
        url: `/delete/${createdEntry.id}`,
      });

      expect(deleteResponse.statusCode).toBe(200);
      expect(JSON.parse(deleteResponse.payload)).toEqual({ msg: 'Deleted successfully' });

      // Verify that the entry is deleted
      const getResponse = await server.inject({
        method: 'GET',
        url: `/get/${createdEntry.id}`,
      });

      expect(getResponse.statusCode).toBe(500);
    });

    it('should return 500 if deletion fails', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: '/delete/non-existent-id',
      });

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.payload)).toEqual({ msg: 'Error deleting entry' });
    });
  });

  describe('PUT /update/:id', () => {
    it('should update an entry if it exists', async () => {
      // First, create a new entry
      const newEntry = {
        title: 'Entry to Update',
        description: 'This entry will be updated',
        scheduled_at: new Date().toISOString(),
      };

      const createResponse = await server.inject({
        method: 'POST',
        url: '/create/',
        payload: newEntry,
      });

      const createdEntry = JSON.parse(createResponse.payload) as Entry;

      // Now, update the entry
      const updatedData = {
        title: 'Updated Entry',
        description: 'This entry has been updated',
        scheduled_at: new Date().toISOString(),
      };

      const updateResponse = await server.inject({
        method: 'PUT',
        url: `/update/${createdEntry.id}`,
        payload: updatedData,
      });

      expect(updateResponse.statusCode).toBe(200);
      expect(JSON.parse(updateResponse.payload)).toEqual({ msg: 'Updated successfully' });

      // Verify that the entry is updated
      const getResponse = await server.inject({
        method: 'GET',
        url: `/get/${createdEntry.id}`,
      });

      const updatedEntry = JSON.parse(getResponse.payload) as Entry;
      expect(updatedEntry).toHaveProperty('title', updatedData.title);
      expect(updatedEntry).toHaveProperty('description', updatedData.description);
    });

    it('should return 500 if update fails', async () => {
      const response = await server.inject({
        method: 'PUT',
        url: '/update/non-existent-id',
        payload: { title: 'Failed Update', description: 'This update should fail' },
      });

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.payload)).toEqual({ msg: 'Error updating' });
    });
  });
});