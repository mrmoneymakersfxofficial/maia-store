import { redirect } from "next/navigation";

/**
 * /presentation → redirects to /admin
 *
 * The Presentation Tool is a plugin inside Sanity Studio (sanity v6+),
 * NOT a standalone page. It appears as "Vista Previa" tab in the Studio
 * sidebar at /admin. This redirect ensures users who navigate to
 * /presentation directly are sent to the correct location.
 */
export default function PresentationRedirect() {
  redirect("/admin");
}