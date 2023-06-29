import '@/styles/globals.css'
import AuthWrapper from '@/components/Auth/Auth'
import Layout from '@/components/Layout/Layout'
import { NavCollapseWraper } from '@/context/NavContext'
import { NavShowWraper } from '@/context/ShowNavContext'


export default function App({ Component, pageProps }) {
  return (
    <AuthWrapper>
      <NavShowWraper>
        <NavCollapseWraper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NavCollapseWraper>
      </NavShowWraper>
    </AuthWrapper>
  )
}
