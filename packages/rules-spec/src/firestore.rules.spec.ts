import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, it, beforeAll, afterAll } from 'vitest';

let testEnv: RulesTestEnvironment;

describe('Firestore security rules', () => {
  beforeAll(async () => {
    // Resolve the path to the firestore.rules file from the project root
    const rulesPath = resolve(__dirname, '../../../../firestore.rules');
    const rules = readFileSync(rulesPath, 'utf8');

    testEnv = await initializeTestEnvironment({
      projectId: 'pawdar-test',
      firestore: {
        rules,
      },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it('should allow a user to read their own data', async () => {
    const userId = 'user123';
    const db = testEnv.authenticatedContext(userId).firestore();
    const userDoc = db.collection('users').doc(userId);

    await assertSucceeds(userDoc.get());
  });

  it('should deny a user from reading another user\'s data', async () => {
    const authenticatedUserId = 'user123';
    const otherUserId = 'user456';
    const db = testEnv.authenticatedContext(authenticatedUserId).firestore();
    const otherUserDoc = db.collection('users').doc(otherUserId);

    await assertFails(otherUserDoc.get());
  });

  it('should deny unauthenticated users from reading any data', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const userDoc = db.collection('users').doc('anyUser');
    await assertFails(userDoc.get());
  });
});