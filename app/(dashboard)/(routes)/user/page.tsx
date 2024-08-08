import Box from '@/components/box'
import CustomBreadCrumb from '@/components/custom-bread-crumd'
import { auth, currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import NameForm from './_components/name-form'
import { db } from '@/lib/db'
import EmailForm from './_components/email-form'

const ProfilePage = async () => {

    const { userId } = auth()
    const user = await currentUser()

    if (!userId) {
        redirect("/sigin-in")
    }
    
    let profile = await db.userProfile.findUnique({
        where : {
            userId
        },
        include : {
            resumes : {
                orderBy: {
                    createdAt : "desc"
                }
            }
        }
    })

    return (
        <div className='flex-col p-4 md:p-8 items-center justify-center flex'>
            <Box>
                <CustomBreadCrumb breadCrumbPage='My-Profile' />
            </Box>
            <Box className='flex-col p-4 rounded-md mt-8 w-full space-y-6 border'>
                {
                    user && user.hasImage && (
                        <div className="aspect-square w-24 h-24 rounded-full shadow-md relative overflow-hidden">
                            <Image
                                src={user.imageUrl}
                                alt="User Profile Pic"
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                    )}
                <NameForm initialData={profile} userId={userId}/>
                <EmailForm initialData={profile} userId={userId}/>
            </Box>
        </div>
    )
}

export default ProfilePage
