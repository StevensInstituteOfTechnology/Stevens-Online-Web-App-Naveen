import React from "react";
import { DegreeTemplate, CertificateTemplate } from "./templates";

/**
 * ProgramPageTemplate - Backward-compatible wrapper
 *
 * This component automatically selects the appropriate template based on
 * the program type (degree vs certificate). It provides backward compatibility
 * for existing page files while internally using the new modular templates.
 *
 * Detection Logic:
 * - Certificate if: code starts with "cert-" OR admissions.variant === "certificateWithDeadlines"
 * - Degree otherwise (default)
 *
 * For new pages, consider importing DegreeTemplate or CertificateTemplate directly
 * from './templates' for explicit template selection.
 *
 * @deprecated Prefer importing DegreeTemplate or CertificateTemplate directly
 */
export default function ProgramPageTemplate({
  programData,
  useApplicationModal = false,
  useRequestInfoModal = true,
}) {
  // Detect if this is a certificate page
  const isCertificate =
    programData?.admissions?.variant === "certificateWithDeadlines" ||
    programData?.code?.startsWith("cert-");

  // Delegate to the appropriate template
  if (isCertificate) {
    return (
      <CertificateTemplate
        programData={programData}
        useApplicationModal={useApplicationModal}
        useRequestInfoModal={useRequestInfoModal}
      />
    );
  }

  return (
    <DegreeTemplate
      programData={programData}
      useApplicationModal={useApplicationModal}
      useRequestInfoModal={useRequestInfoModal}
    />
  );
}
