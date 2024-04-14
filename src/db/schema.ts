import { relations, sql } from "drizzle-orm";
import {
  blob,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
  index,
} from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { courseMember } from "./course-member";
import { organizationMember } from "./organization-member";
import { course } from "./course";
import { purchase } from "./purchase";

export const organization = sqliteTable("organization", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});
