import Box from '@/components/box'
import CustomBreadCrumb from '@/components/custom-bread-crumd'
import { auth, currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import NameForm from './_components/name-form'
import { db } from '@/lib/db'
import EmailForm from './_components/email-form'
import ContactForm from './_components/contact-form'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { truncate } from 'lodash'

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

    const FollowedCompanies = db.company.findMany({
        where : {
            followers: {
                has : userId
            }
        },
        orderBy :{
            createdAt:"desc"
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
                <ContactForm initialData={profile} userId={userId}/>
            </Box>
            <Box className='flex-col items-start justify-start mt-12'>
                    <h2 className='text-2xl text-muted-foreground font-semibold'>
                        Followed Companies
                    </h2>
                    <div className="mt-6 w-full grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-6 gap-2">
                    {(await FollowedCompanies).length == 0 ? <p className='italic'>No Companies Followed yet</p> : <React.Fragment>
                        {(await FollowedCompanies).map(com => (
                            <Card className='p-3 space-y-2 relative' key={com.id}>
                                {
                                    com.logo && (
                                        <div className="w-full h-24 flex items-center justify-center relative overflow-hidden">
                                            <Image
                                            fill
                                            alt='Logo'
                                            src={com.logo}
                                            className='object-contain w-full h-full'
                                            />
                                        </div>
                                    )
                                }
                                <CardTitle className='text-lg text-center'>{com.name}</CardTitle>
                                {com.description && (
                                    <CardDescription>
                                        {truncate(com.description, {
                                            length : 80,
                                            omission:"..."
                                        })}
                                    </CardDescription>
                                )}
                            </Card>
                        ))}
                    </React.Fragment>}
                    </div>
            </Box>
        </div>
    )
}

export default ProfilePage
