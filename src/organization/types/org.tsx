export interface organization {
    org_id: string;
    name: string;
    role: string;
    isPrimary: boolean;
    imageUrl?: string | null;
  }
  
  export interface organizationsResponse {
    organizations: organization[];
  }