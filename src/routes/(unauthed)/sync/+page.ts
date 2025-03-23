import type { AutomergeDocumentId } from "$lib/automergeState.svelte";
import type { UserDocument } from "$lib/states/userDocument.svelte";
import { signInWithDocumentId } from "$lib/states/userDocumentIds.svelte";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { createNotification } from "$lib/states/notifications.svelte";
import { m } from "$lib/paraglide/messages";
import { base } from "$app/paths";

export const load: PageLoad = async (event) => {
  const username = decodeURIComponent(event.url.searchParams.get('username') || "");
  const userDocumentId = decodeURIComponent(event.url.searchParams.get('userDocumentId') || "") as AutomergeDocumentId<UserDocument>;
  try {
    await signInWithDocumentId(username, userDocumentId);
  } catch (e) {
    console.error(e);
    createNotification(m.errors_message_invalid_sync_code());
    redirect(302, `${base}/signin`);
  }
  redirect(302, `${base}/`);
}