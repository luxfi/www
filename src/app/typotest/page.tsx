import React  from 'react'

import Header from "@/components/Header"
import ApplyTypography from '@/primitives/apply-typography'
import Footer from '@/components/footer'
import AssetBanner from '@/components/asset-banner'

import { landing } from '@/content'
import TypoTest from '@/content/typography-test.mdx'

const Page: React.FC = () => (<>
  <Header />
  <div className='p-6 pt-4 flex flex-col justify-start items-stretch md:items-center'>
    <ApplyTypography asTag='section' className='mb-12 flex flex-col justify-start items-stretch gap-2 md:gap-4 lg:gap-6'>
      <AssetBanner asset={landing.assets[0]} />
    </ApplyTypography>
    <ApplyTypography key='last' className='px-2 mt-12 flex flex-col justify-center items-center' >
      <TypoTest />
    </ApplyTypography>
  </div>
  <Footer />
</>)

export default Page
