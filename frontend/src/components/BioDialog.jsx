import React, { useState } from 'react'
import { Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, } from './ui/dialog'
import { MoreVertical } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useUserStore } from '../app/UserStore'
import { useAuth } from '@clerk/clerk-react'

const BioDialog = () => {
    const {updateBio, getUserData} = useUserStore()
    const {userId}  =useAuth()
    const [bio, setBio]  =useState()
    console.log(bio);
    

    const handleBioSubmit = async () => {
        console.log('called in nioDialog');

        await updateBio(userId, bio)
        getUserData()
    }

  return (
    <div>
    <Dialog>
        <DialogTrigger asChild>
          <Button variant={'secondary'}>Edit profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="bio">Bio</label>
              <Input value={bio} onChange={(e) => setBio(e.target.value)} id="bio" name="bio-1" defaultValue="I'm alive and happy..." />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick = {handleBioSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
    </div>
  )
}

export default BioDialog