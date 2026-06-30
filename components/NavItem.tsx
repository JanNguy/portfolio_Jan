"use client";

import Link from "next/link";

type NavItemProps = {
    name: string;
    description?: string;
    href: string;
    external?: boolean;
};

const NAV_LINK_CLASS =
    "times-normal text-[0.9rem] sm:text-[1rem] text-neutral-500 hover:text-neutral-900 hover:underline transition-colors duration-200 cursor-pointer";

export default function NavItem({ name, description, href, external }: NavItemProps) {
    const content = (
        <div className="group">
            <p className={NAV_LINK_CLASS}>{name}</p>
            {description && (
                <p className="times-normal text-neutral-400 text-sm mt-0.5 leading-snug">{description}</p>
            )}
        </div>
    );

    if (external) {
        return (
            <li>
                <a href={href} target="_blank" rel="noopener noreferrer">
                    {content}
                </a>
            </li>
        );
    }

    return (
        <li>
            <Link href={href}>{content}</Link>
        </li>
    );
}
