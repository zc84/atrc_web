export const ROUTE_PATHS = {
  home: '/',
  pathways: '/career-pathways',
  technologies: '/technologies',
  technologyDetail: '/technologies/:technologyId',
  opportunities: '/opportunities',
  enablement: '/talent-enablement',
  planner: '/career-planner',
  careerTest: '/career-test',
  careerTestQuestions: '/career-test/questions',
  careerTestResult: '/career-test/result',
  login: '/login',
  register: '/register',
  account: '/account',
  iphoneHome: '/iphone/home',
  iphone: '/iphone/*',
}

export function technologyDetailPath(technologyId) {
  return `/technologies/${technologyId}`
}

export function iphoneTechnologyPath(technologyId) {
  return `/iphone/technologies/${technologyId}`
}

export function iphonePathwayPath(pathwayId) {
  return `/iphone/pathways/${pathwayId}`
}

export function iphonePathForWebPath(pathname) {
  if (pathname === ROUTE_PATHS.technologies) return '/iphone/technologies'
  if (pathname.startsWith('/technologies/')) return `/iphone${pathname}`
  if (pathname === ROUTE_PATHS.pathways) return '/iphone/pathways'
  if (pathname.startsWith('/career-test')) return '/iphone/career-test'
  if (pathname === ROUTE_PATHS.login) return '/iphone/login'
  if (pathname === ROUTE_PATHS.account || pathname === ROUTE_PATHS.register) return '/iphone/profile'
  if (pathname === ROUTE_PATHS.planner) return '/iphone/career-planner'
  return ROUTE_PATHS.iphoneHome
}
