import { useEffect, useState } from 'react';
import { SelectInput } from '../components';
import { OrgContext } from './orgContext';
import { orgService } from './orgService';

interface Organization {
  orgId: string;
  orgName: string;
  orgImageUrl?: string;
}

export function OrgSwitcher() {
  const [currentOrgId, setCurrentOrgId] = useState<string | null>(null);
  const [currentOrg, setCurrentOrg] = useState<any | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentOrgId(OrgContext.getCurrentOrganization());
    setCurrentOrg(OrgContext.getOrganizationData());
    setOrganizations(OrgContext.getAvailableOrganizations());
  }, []);

  const switchOrganization = async (org: Organization) => {
    if (org.orgId === currentOrgId) return;

    setLoading(true);
    
    // Convert to new format
    const orgData = {
      _id: org.orgId,
      name: org.orgName,
      imageUrl: org.orgImageUrl,
    };

    const success = await orgService.switchOrganization(orgData as any);
    if (!success) {
      console.error('Unable to switch organization');
      setLoading(false);
      return;
    }

    window.location.reload();
  };

  const options = organizations.map((org) => ({
    value: org.orgId,
    label: org.orgName,
  }));

  const handleSelect = (orgId: string) => {
    const org = organizations.find((o) => o.orgId === orgId);
    if (org) switchOrganization(org);
  };

  return (
    <SelectInput
      placeholder={!currentOrg ? 'Loading' : 'Select organization'}
      value={currentOrgId ?? undefined}
      options={options}
      disabled={loading || !currentOrg || organizations.length <= 1}
      onSelect={handleSelect}
      width="md"
    />
  );
}
