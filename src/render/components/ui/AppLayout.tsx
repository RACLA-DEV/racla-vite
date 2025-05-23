import { RootState } from '@render/store'
import type { ChildrenReactNodeProps } from '@src/types/render/ChildrenReactNodeProps'
import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import PageLoading from '../app/PageLoading'

// 지연 로딩을 위한 컴포넌트 임포트
const Footer = lazy(() => import('./Footer'))
const TitleBar = lazy(() => import('./Header'))
const IconSidebar = lazy(() => import('./IconSidebar'))
const MainContent = lazy(() => import('./MainContent'))
const MenuSidebar = lazy(() => import('./MenuSidebar'))

const AppLayout: React.FC<ChildrenReactNodeProps> = ({ children }) => {
  const { theme } = useSelector((state: RootState) => state.ui)
  const { font } = useSelector((state: RootState) => state.app.settingData)
  return (
    <div
      className={`tw:flex tw:flex-col tw:h-screen ${font != 'default' ? 'tw:font-medium' : ''} ${
        theme === 'dark'
          ? 'tw:bg-gradient-to-br tw:from-slate-900/95 tw:via-slate-900/95 tw:to-slate-900'
          : 'tw:bg-gradient-to-br tw:from-indigo-50 tw:via-white/90 tw:to-white/40'
      }`}
    >
      {/* 커스텀 타이틀바 */}
      <Suspense fallback={<div className='tw:h-10' />}>
        <TitleBar />
      </Suspense>

      <div className='tw:flex tw:flex-1 tw:overflow-hidden'>
        {/* 아이콘 사이드바 */}
        <div className='tw:relative tw:z-10'>
          <Suspense fallback={<div className='tw:w-16' />}>
            <IconSidebar />
          </Suspense>
        </div>

        {/* 내부 콘텐츠 컨테이너 - 둥근 모서리 적용 */}
        <div
          className={`tw:flex tw:flex-1 tw:overflow-hidden tw:rounded-tl-xl tw:rounded-bl-xl tw:ml-0 tw:border-t tw:border-l tw:border-b tw:relative tw:mb-8 ${
            theme === 'dark'
              ? 'tw:bg-slate-800 tw:border-slate-700/40 tw:backdrop-blur-sm'
              : 'tw:bg-white tw:border-indigo-100/40 tw:backdrop-blur-sm'
          }`}
        >
          {/* 메뉴 사이드바 */}
          <Suspense fallback={<div className='tw:w-64' />}>
            <MenuSidebar />
          </Suspense>

          {/* 메인 컨텐츠 영역 */}
          <Suspense fallback={<PageLoading />}>
            <MainContent>{children}</MainContent>
          </Suspense>
        </div>
      </div>

      {/* 푸터 영역 */}
      <Suspense fallback={<div className='tw:h-8' />}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default AppLayout
