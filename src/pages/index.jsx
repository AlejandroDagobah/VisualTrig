import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { info } from "../info"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const IndexPage = () => (
  <Layout>
    <div className="max-w-[1400px] pt-40 flex flex-col items-center">
      <StaticImage src="../images/VisualTrig.png" alt="VisualTrig Logo" className="max-w-[450px]"/>
      <p className="text-mainGray font-semibold text-lg">{info.title}</p>
      <Link href={info.buttonURL} className="text-mainGreen text-lg p-4 transition-all duration-100 hover:-translate-y-[5px]">{info.buttonText}</Link>
      <a href={info.buttonURL}>
        <StaticImage src="../images/dashboard.png" alt="VisualTrig Logo" className="my-24 drop-shadow-2xl"/>
      </a>
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
