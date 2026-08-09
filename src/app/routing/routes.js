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
}

export function technologyDetailPath(technologyId) {
  return `/technologies/${technologyId}`
}
