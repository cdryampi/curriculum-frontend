// BottomBar2.js
import { Link } from "react-router-dom";
import React from "react";
import ListStaticPages from "../../hooks/UseListStaticPagesHook";
import { ClipLoader } from "react-spinners";

const BottomBar2 = () => {
  const { data: staticPageData, loading, error } = ListStaticPages();

  if (error) {
    return <div>Error al cargar las páginas estáticas.</div>;
  }

  return (
    <div className="bottomBarWrap relative w-full py-8">
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <ClipLoader size={60} color="#284be5" loading={true} />
        </div>
      ) : (
        <div className="container sm:container md:container lg:container xl:container 2xl:container mx-auto">
          <div className="bottomBar gap-4 flex flex-col md:flex-row justify-center md:justify-between items-center">
            <p className="text-desc2 text-[1rem] md:text-[1.0625rem] font-NunitoSans font-semibold">
              &copy; 2024 All Right Reserved.
            </p>
            <ul className="flex relative divide-x divide-solid -mr-6">
              {staticPageData.map(
                (item, index) =>
                  index < 5 && (
                    <li
                      className="text-desc2 text-[1rem] md:text-[1.0625rem] font-NunitoSans font-semibold px-6 leading-none"
                      key={index}
                    >
                      <Link
                        className="hover:text-accent"
                        to={`/static-page/${item.slug}`}
                        title={item.title}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
              )}
            </ul>
            {/* Bottom Bar */}
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomBar2;
