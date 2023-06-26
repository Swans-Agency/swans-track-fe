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
            <div className='ml-[256px] px-16 py-6'>
              <Component {...pageProps} />
            </div>
          </Layout>
        </NavCollapseWraper>
      </NavShowWraper>
    </AuthWrapper>
  )
}
