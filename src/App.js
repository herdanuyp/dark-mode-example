import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useTransition, animated, config } from 'react-spring'

import { DarkModeProvider } from './context/darkModeProvider'
import { IdeaProvider } from './context/ideaStateProvider'
import { GlobalStyles } from './assets/styles/global'
import Navbar from './components/Navigation'
import useRouter from './utils/useRouter'
import NoMatch from './components/NoMatch'

const Dashboard = lazy(() => import('./components/Dashboard'))
const FormComponent = lazy(() => import('./components/Form'))
const Loading = () => <div>loading...</div>
function App() {
  const { location } = useRouter()
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses
  })

  return (
    <div>
      <DarkModeProvider>
        <IdeaProvider>
          <GlobalStyles />
          <Navbar />
          <Suspense fallback={<Loading />}>
            {transitions.map(({ item, props, key }) => (
              <animated.div key={key} style={props}>
                <Switch location={item}>
                  <Route exact path='/'>
                    <Dashboard />
                  </Route>
                  <Route path='/start-share-idea-or-project'>
                    <FormComponent />
                  </Route>
                  <Route path='*'>
                    <NoMatch />
                  </Route>
                </Switch>
              </animated.div>
            ))}
          </Suspense>
        </IdeaProvider>
      </DarkModeProvider>
    </div>
  )
}

export default App
