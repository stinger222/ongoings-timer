'use client'

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateCardForm } from "./CreateCardForm";

export default function CreateCardFormWrapper() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open</Button>}></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {/* <DialogTitle className="mb-3">Add show</DialogTitle> */}
          <CreateCardForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}