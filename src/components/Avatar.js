import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Avatar = ({ imageURL, userId, width, height, disable , extraWidth = 0, extraHeight = 0 }) => {
    const path = usePathname()
    return (
        <Link
            href={disable ? path :  "/"+userId}
        >
            {
                imageURL ? (
                    <Image
                        src={imageURL}
                        width={width + extraWidth}
                        height={height + extraHeight}
                        alt='current user'
                        className='rounded-full overflow-hidden drop-shadow-sm'
                    />
                ) :
                    (
                        <Image
                            src={'/assets/icons/user.png'}
                            width={width}
                            height={height}
                            alt='current user'
                        />
                    )
            }
        </Link>
    )
}

export default Avatar
