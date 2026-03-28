'use client'

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateCardForm } from "./CreateCardForm";

export default function CreateCardFormWrapper() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open</Button>}></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <CreateCardForm />

        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}