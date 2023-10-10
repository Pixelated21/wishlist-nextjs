import Link from "next/link";
import { RegisterLink, LoginLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  const { getUser, isAuthenticated } = getKindeServerSession();

  if (isAuthenticated()) {
    redirect('/profile')
  }

  return (
    <main className='min-h-screen'>
      <section className="bg-white">
        <nav className="container p-6 mx-auto lg:flex lg:justify-between lg:items-center">
          <div className="flex items-center justify-between">
            <Link href={`/`} className="text-3xl font-bold text-blue-600">
              DreamCatch
            </Link>

          </div>

          <div
            className="flex gap-x-2">
            <Button variant={'secondary'}>
              <LoginLink >Sign in</LoginLink>
            </Button>
            <Button>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
          </div>
        </nav>

        <div className="container px-6 py-16 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-xl font-bold text-gray-800 lg:text-5xl">Craft Your Dream Wishlist</h1>
            <p className="mt-6 text-gray-500">Add gifts from any website, share with anyone, and turn your dreams into a
              reality. Craft a personalized wishlist that embodies your desires and aspirations. Whether it&apos;s
              products from your favorite online stores or unique gift ideas, our platform empowers you to shape a
              wishlist that&apos;s uniquely yours.</p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href={'/profile'}
                className="px-10 py-3 mt-6 text-sm font-semibold leading-5 border-2 border-blue-600 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none transition ease-in-out duration-300">
                Get Started
              </Link>
              <Link
                href={'/profile'}
                className="px-10 py-3 mt-6 text-sm font-semibold leading-5 text-center text-blue-600 capitalize border-2 border-blue-600 hover:bg-blue-600 rounded-lg hover:text-white lg:mx-0 lg:w-auto focus:outline-none transition ease-in-out duration-300">Learn
                More</Link>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            {/* <img className="object-cover w-full rounded-xl lg:w-3/5" src="assets/images/hero_img.png" /> */}
          </div>
        </div>
      </section>

      <section>
        <div className="h-[40rem] class flex flex-col justify-center align-center" style={{
          backgroundImage: "url(assets/images/rec2.png); background-repeat: no-repeat",
        }}>


          <h2 className="text-2xl font-bold text-center text-gray-800 capitalize lg:text-4xl">How it Works
          </h2>

          <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
            <div className="w-[18rem] block rounded-lg p-4 shadow-lg shadow-indigo-100 bg-white">
              <Image
                width={288}
                height={160}
                alt="Home"
                src="/assets/images/step1.png"
                className="h-40 w-full rounded-md object-cover"
              />
              <div className="mt-2 text-center">
                <div className="text-lg font-bold">Create a Wishlist
                </div>
                <div className="mt-2 flex items-center gap-8 text-sm">
                  <p>Wishlists can be for yourself, for a friend, or even a pet!</p>
                </div>
              </div>
            </div>

            <div className="w-[18rem] block rounded-lg p-4 shadow-lg shadow-indigo-100 bg-white">
              <Image
                width={288}
                height={160}
                alt="Home"
                src="/assets/images/step2.png"
                className="h-40 w-full rounded-md"
              />
              <div className="mt-2 text-center">
                <div className="text-lg font-bold">Add Wishes
                </div>
                <div className="mt-2 flex items-center gap-8 text-sm">
                  <p>Paste a link from any website. We&apos;ll load in the details.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[18rem] block rounded-lg p-4 shadow-lg shadow-indigo-100 bg-white">
              <img
                alt="Home"
                src="assets/images/step3.png"
                className="h-40 w-full rounded-md"
              />
              <div className="mt-2 text-center">
                <div className="text-lg font-bold">Share & Claim
                </div>
                <div className="mt-2 flex items-center gap-8 text-sm">
                  <p>Friends claim your wishes anonymously. Be Surprised.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="container flex flex-col items-center px-4 py-12 mx-auto xl:flex-row">
          <div className="flex justify-center xl:w-1/2">
            <img className="h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover rounded-full" src="assets/images/surprised-happy-woman-with-open-gift-box-vector.jpg" alt="" />
          </div>

          <div className="flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0">
            <h2 className="text-xl font-semibold tracking-tight text-gray-800 xl:text-5xl">
              Surprise & Be Surprised
            </h2>

            <p className="block max-w-2xl mt-4 text-gray-500">Giftful lets you claim friends&apos; wishes without them knowing what&apos;s been claimed. That way, when you give them their gift, they&apos;re truly surprised.
            </p>

            <div className="mt-6 sm:-mx-2">
              <Link
                href={'/profile'}
                className="inline-flex items-center justify-center w-full px-6  py-3 mt-4 overflow-hidden text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Edit / Add_Plus_Circle">
                    <path id="Vector" d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
                <span className="mx-2 font-semibold">
                  Create Wishlist
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-white border-t">
        <div className="container flex flex-col items-center justify-between px-6 py-8 mx-auto lg:flex-row">
          <a className="text-3xl font-bold text-blue-600">
            DreamCatch
          </a>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0">
            <a
              className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500">
              FAQs
            </a>

            <a
              className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500">
              Login
            </a>

            <a
              className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500">
              Register
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-500 lg:mt-0">© Copyright 2023 Proximity </p>
        </div>
      </footer>
    </main >
  )
}
