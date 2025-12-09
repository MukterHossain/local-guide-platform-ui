import BecomeGuideCTA from '@/components/modules/Home/BecomeGuideCTA';
import Categories from '@/components/modules/Home/Categories';
import FeaturedCities from '@/components/modules/Home/FeaturedCities';
import Hero from '@/components/modules/Home/Hero';
import HowItWorks from '@/components/modules/Home/HowItWorks';
import PopularDestinations from '@/components/modules/Home/PopularDestinations';
import Testimonials from '@/components/modules/Home/Testimonials';
import TopGuides from '@/components/modules/Home/TopGuides';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { UserInfo } from '@/types/user.interface';
import Head from 'next/head';


const HomePage = async() => {
    const userInfo = (await getUserInfo()) as UserInfo;
    console.log("userInfo", userInfo)
    return (
        <>
            <Head>
                <title>Travel Guide Platform</title>
                <meta name="description" content="Discover and book local guides worldwide." />
            </Head>
            <main className="flex flex-col gap-8">
                <Hero />
                <HowItWorks />
                <PopularDestinations />
                <FeaturedCities />
                <TopGuides />
                <Categories />
                <Testimonials />
                <BecomeGuideCTA />
            </main>
        </>
    );
};

export default HomePage;