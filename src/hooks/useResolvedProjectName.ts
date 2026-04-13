import { useState, useEffect } from 'react';
import { getProjectById } from '../data/projects';
import { apiService } from '../api/api.service';

/**
 * Sidebar / shell title for `/projects/:projectId/*`.
 * Demo IDs in `data/projects` resolve synchronously; UUIDs load `name` from GET /api/projects/:id.
 */
export function useResolvedProjectName(projectId: string | undefined): string {
  const staticName = projectId ? getProjectById(projectId)?.projectName : undefined;
  const [apiName, setApiName] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setApiName(null);
      return;
    }
    if (staticName) {
      setApiName(null);
      return;
    }

    let cancelled = false;
    setApiName(null);

    (async () => {
      try {
        const project = await apiService.get<{ name?: string }>(
          `/api/projects/${encodeURIComponent(projectId)}`,
        );
        const n = project?.name?.trim();
        if (!cancelled) {
          setApiName(n || shortIdLabel(projectId));
        }
      } catch {
        if (!cancelled) {
          setApiName(shortIdLabel(projectId));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [projectId, staticName]);

  if (!projectId) {
    return '';
  }
  if (staticName) {
    return staticName;
  }
  return apiName ?? '…';
}

function shortIdLabel(id: string): string {
  const t = id.trim();
  if (t.length <= 12) return t;
  return `${t.slice(0, 8)}…`;
}
