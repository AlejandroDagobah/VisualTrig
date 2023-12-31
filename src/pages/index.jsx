import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { info } from "../info"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {IconBrandGithubFilled, } from "@tabler/icons-react"

import * as styles from "../components/index.module.css"

const IndexPage = () => (
  <Layout>
    <div className="flex justify-center text-mainWhite self-center w-full">

      <div className="max-w-[1400px] pt-40 flex flex-col items-center">
        <StaticImage src="../images/VisualTrig.png" alt="VisualTrig Logo" className="max-w-[230px] md:max-w-[450px]"/>
        <p className="text-mainGray font-semibold text-md md:text-xl text-center">{info.title}</p>
        {/* <Link href={info.buttonURL} className="text-mainBlack text-lg p-4 no-underline transition-all duration-100 hover: p-4 bg-mainGreen drop-shadow-md rounded-lg">{info.buttonText}</Link> */}
        <Link href={info.buttonURL} class="relative inline-flex items-center justify-start no-underline py-3 pl-4 pr-12 overflow-hidden font-semibold text-mainBlack transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-mainGreen mt-4 group">
          {/* <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-mainGreen group-hover:h-full"></span> */}
          <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
          <svg class="w-5 h-5 text-mainBlack" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
          <svg class="w-5 h-5 text-mainBlack" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-mainBlack">{info.buttonText}</span>
        </Link>
        <a href={info.buttonURL} className="px-4 hidden md:block">
          <StaticImage src="../images/visualTrig.jpg" alt="VisualTrig Logo" className="my-24 drop-shadow-2xl"/>
        </a>

        <div className="max-w-[80%] mt-12">
          <div className="flex flex-col md:flex-row gap-5">

            <div>
              <StaticImage src="../images/unit-circle.png" alt="VisualTrig Logo" className="mb-6 drop-shadow-2xl"/>
              <h4 className="H4title">{info.sections.first.title}</h4>
              <p>{info.sections.first.desc}</p>
            </div>

            <div>
              <StaticImage src="../images/trigo-func.png" alt="VisualTrig Logo" className="mb-6 drop-shadow-2xl"/>
              <h4 className="H4title">{info.sections.second.title}</h4>
              <p>{info.sections.second.desc}</p>

            </div>

          </div>

          <div className="my-24 flex flex-col md:flex-row justify-around items-center">
              <StaticImage src="../images/modificators.png" alt="VisualTrig Logo" className="mb-6 drop-shadow-2xl basis-1/3"/>
              
              <div className="basis-1/3">
                <h4 className="H4title">{info.sections.third.title}</h4>
                <p>{info.sections.third.desc}</p>
              </div>

            </div>

          <div className="my-24 flex flex-col-reverse md:flex-row justify-around items-center">
              
              <div className="basis-1/3">
                <h4 className="H4title">{info.sections.fourth.title}</h4>
                <p>{info.sections.fourth.desc}</p>
              </div>

              <StaticImage src="../images/values.png" alt="VisualTrig Logo" className="mb-6 drop-shadow-2xl basis-1/2"/>
            </div>

          <div className="my-24 flex flex-col md:flex-row justify-around items-center">
              <StaticImage src="../images/options.png" alt="VisualTrig Logo" className="mb-6 drop-shadow-2xl basis-1/2"/>
              
              <div className="basis-1/3">
                <h4 className="H4title">{info.sections.fiveth.title}</h4>
                <p>{info.sections.fiveth.desc}</p>
              </div>

            </div>
        </div>


        <div className="flex flex-col max-w-[300px] items-center justify-center my-40">
          <a href="https://aledevelops.me" target="_blank" className="px-8">
            <StaticImage src="../images/aledevelops-logo.png" alt="Aledevelops Logo"/>
          </a>

          <div className="text-center my-4" dangerouslySetInnerHTML={{__html: info.madeBy}} ></div>

            <a href="https://github.com/AlejandroDagobah/VisualTrig" target="_blank" className="text-mainGreen text-sm no-underline transition-all duration-100 hover:-translate-y-[5px]">
              <span className="flex justify-between ">
                {info.repo}
                <IconBrandGithubFilled size={20} color="#13F4BE" className="ml-px"/>
              </span> 
            </a>

        </div>


      </div>
    </div>

  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
