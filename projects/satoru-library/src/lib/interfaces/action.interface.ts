/** Interface to share data */
export interface ActionPayload {
    /** Data */
    data: any;
    /** Function name */
    functionName: string;
    /** Firestore collection name */
    collectionName?: string;
}
  