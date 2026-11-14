import { ShieldCheck, ShieldAlert, Swords, Award } from "lucide-react";

export type Certificate = {
    slug: string;
    file: string;
    title: string;
    issuer: string;
    year: string;
    description: string;
    icon: typeof Award;
};

export const CERTIFICATES: Certificate[] = [
    {
        slug: "blue-team-fundamentals",
        file: "blue-team_renaldyhidayat.pdf",
        title: "Certified Blue Team Fundamentals (BTF)",
        issuer: "CyberWarfare Labs",
        year: "2026",
        description:
            "Fundamental defensive security: monitoring, incident response, log analysis, and blue team operations workflow.",
        icon: ShieldCheck,
    },
    {
        slug: "cyber-security-analyst",
        file: "ethical-hacking.pdf",
        title: "Certified Cyber Security Analyst (C3SA)",
        issuer: "CyberWarfare Labs",
        year: "2026",
        description:
            "Analytical cybersecurity covering vulnerability assessment, ethical hacking methodology, and security analysis practice.",
        icon: ShieldAlert,
    },
    {
        slug: "cybersecurity-educator",
        file: "redteam.pdf",
        title: "Certified Cybersecurity Educator Professional (CCEP)",
        issuer: "Red Team Leaders",
        year: "2026",
        description:
            "Recognition as a cybersecurity educator professional, covering offensive security teaching and red team fundamentals.",
        icon: Swords,
    },
    {
        slug: "ccna-switching-routing-wireless",
        file: "RenaldyHidayat-CN2AZY202201-certificate_cisco.pdf",
        title: "CCNA: Switching, Routing, and Wireless Essentials",
        issuer: "Cisco Networking Academy",
        year: "2023",
        description:
            "Second CCNA course: switching concepts, VLANs, routing protocols, and wireless network configuration.",
        icon: Award,
    },
    {
        slug: "ccna-introduction-networks",
        file: "RenaldyHidayat-CN1PMA202201-certificate-cisco.pdf",
        title: "CCNA: Introduction to Networks",
        issuer: "Cisco Networking Academy",
        year: "2022",
        description:
            "First CCNA course: networking fundamentals, IP addressing, basic router and switch configuration.",
        icon: Award,
    },
];

export const getCertificate = (slug?: string) =>
    CERTIFICATES.find((cert) => cert.slug === slug);

/** Absolute URL of the static PDF, built from the origin so the browser
 *  fetches the real file instead of handing the path to the router. */
export const certificateUrl = (cert: Certificate) =>
    new URL("sertifikat/" + cert.file, window.location.origin + "/").href;
