import React, { useEffect } from "react";
import { PageHero } from "@/components/shared";
import {
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
} from "@/utils";
import SkillTree from "@/components/workforce-hub/SkillTree";

/**
 * Workforce Hub – placeholder page under Discover.
 * Context: professionals who need fast, valuable skills and future-proofed credentials;
 * stackable, market-aligned credentials; pricing aligned with employer tuition assistance;
 * Workforce Development Center uses AI and labor market data for personalized pathways.
 */
export default function WorkforceHub() {
  useEffect(() => {
    setPageTitle("Workforce Hub | Stevens Online");
    setMetaDescription(
      "Stevens Workforce Development Hub – fast, valuable skills and future-proofed credentials for professionals."
    );
    setOpenGraphTags({
      title: "Workforce Hub | Stevens Online",
      description:
        "Stevens Workforce Development Hub – fast, valuable skills and future-proofed credentials for professionals.",
      image: buildCanonicalUrl("/assets/logos/stevens-crest.webp"),
      url: buildCanonicalUrl("/workforce-hub/"),
      type: "website",
    });
  }, []);

  return (
    <div className="bg-stevens-white font-stevens-body">
      <PageHero
        title="Workforce Hub"
        subtitle="Fast, valuable skills and future-proofed credentials for professionals."
        bgImage="/assets/images/shared/lab.webp"
      />
      <section className="py-stevens-3xl bg-gray-900">
        <div className="max-w-7xl mx-auto px-stevens-md">
          <div className="mb-12 text-center">
            <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2 block">
              Interactive Roadmap
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stackable Credentials
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Visualize how your learning journey evolves. Start with a
              specialized{" "}
              <span className="text-blue-400">Graduate Certificate</span> and
              stack your credits directly into a full{" "}
              <span className="text-yellow-500">Master's Degree</span>.
            </p>
          </div>

          {/* Skill Tree Demo */}
          <SkillTree />
        </div>
      </section>
    </div>
  );
}
