"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createCard } from "@/features/cards-list/actions"

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title can't be blank")
    .max(300, "Title should be at most 300 characters"),
  episodes_total: z.coerce
    .number<number>()
    .max(5000, "Are you serious?)"),
  episodes_watched: z.coerce
    .number<number>()
    .max(5000, "Are you serious?)")
})

export function CreateCardForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      episodes_total: 0,
      episodes_watched: 0,
    }
  })

  // function onSubmit(data: z.infer<typeof formSchema>, event?: React.FormEvent) {
  function onSubmit(data: any, event?: any) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })

    // const formData = new FormData();
    const formData = new FormData(event?.target as HTMLFormElement);


    createCard(formData)
  }



  return (
    <div>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-cover">Cover Image</FieldLabel>
            <Input
              id="form-cover"
              name="cover" // Important: matches what createCard expects
              type="file"
              accept="image/*"
            />
          </Field>

          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-title">
                  Show title
                </FieldLabel>
                <Input
                  {...field}
                  id="form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Kimetsu no Yaiba II"
                  autoComplete="off"

                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="episodes_total"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-episodes-total">
                  Total episodes
                </FieldLabel>
                <Input
                  {...field}
                  id="form-episodes-total"
                  aria-invalid={fieldState.invalid}
                  placeholder="12"
                  autoComplete="off"
                  type="number"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          
          <Controller
            name="episodes_watched"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-episodes-watched">
                  Watched episodes
                </FieldLabel>
                <Input
                  {...field}
                  id="form-episodes-watched"
                  aria-invalid={fieldState.invalid}
                  placeholder="0"
                  autoComplete="off"
                  type="number"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          
          <Field orientation="horizontal" className="mt-3">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo">
              Submit
            </Button>
          </Field>
        </FieldGroup>
      </form>

    </div>
  )
}
