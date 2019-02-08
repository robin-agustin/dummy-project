import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import TopNav from './TopNav'

Router.onRouteChangeStart = url => {
    NProgress.start(url)
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default ({ children }) => (
    <div>
        <Head>
            <title>Dummy Project</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css" /> 
        </Head>

        <header>
            <TopNav />
        </header>
            { children }
    </div>
)

