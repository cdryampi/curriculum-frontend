import { Link } from "react-router-dom"
import React from "react"
import useStaticPages from "../../hooks/UseListStaticPagesHook"
import { BottomBarSkeleton } from "../Skeleton"

const BottomBar2 = () => {
  const { data: staticPageData, loading, error, refetch } = useStaticPages()

  if (error) {
    return (
      <div className="bottomBarWrap relative w-full py-8">
        <div className="container mx-auto">
          <div className="flex flex-col items-center py-4">
            <p className="text-red-400 mb-3">Error al cargar las páginas estáticas.</p>
            <button className="bg-accent text-white px-4 py-2 rounded font-bold hover:bg-accent2" onClick={refetch}>Reintentar</button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) return <BottomBarSkeleton />

  return (
    <div className="bottomBarWrap relative w-full py-8">
      <div className="container mx-auto">
        <div className="bottomBar gap-4 flex flex-col md:flex-row justify-center md:justify-between items-center">
          <p className="text-desc2 text-[1rem] md:text-[1.0625rem] font-NunitoSans font-semibold">&copy; 2025 All Right Reserved.</p>
          <ul className="flex relative divide-x divide-solid -mr-6">
            {staticPageData.map((item) => (
              <li className="text-desc2 text-[1rem] md:text-[1.0625rem] font-NunitoSans font-semibold px-6 leading-none" key={item?.slug}>
                <Link className="hover:text-accent" to={`/static-page/${item?.slug}`} title={item?.title}>{item?.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BottomBar2
