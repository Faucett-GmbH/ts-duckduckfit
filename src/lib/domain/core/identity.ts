import { IdGenerator } from "$lib/kernel/id";
import { ulid } from "ulid";

export const ulidGenerator = new IdGenerator(ulid);