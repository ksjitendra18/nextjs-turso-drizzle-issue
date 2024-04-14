import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const course = sqliteTable("course", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  price: integer("price"),
});

export const courseRelations = relations(course, ({ many }) => ({
  courseModule: many(courseModule),
}));

export const courseModule = sqliteTable("course_module", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  courseId: text("course_id").references(() => course.id),
});

export const courseModuleRelations = relations(
  courseModule,
  ({ one, many }) => ({
    course: one(course, {
      fields: [courseModule.courseId],
      references: [course.id],
    }),
    chapter: many(chapter),
  })
);

export const chapter = sqliteTable("course_module", {
  id: text("id")
    .$default(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  resourceId: text("resource_id").notNull(),
  moduleId: text("module_id").references(() => courseModule.id),
});

export const chapterRelations = relations(chapter, ({ one }) => ({
  courseModule: one(courseModule, {
    fields: [chapter.moduleId],
    references: [courseModule.id],
  }),
}));
