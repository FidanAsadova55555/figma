import React from 'react'
import Product from '@/components/product'
import Breadcrumbs from '@/components/bread'
import Bg from '@/assets/bg.svg?url'  
import { getAPIData } from '@/http/api'
import Chevron from "@/assets/chevron.svg"
import Nine from "@/assets/nine.svg"
import Four from "@/assets/four.svg"
import Row from "@/assets/row.svg"
import Column from "@/assets/column.svg"
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/constant/keys'
import Filter from '@/assets/filter.svg'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useState } from 'react'
import Search from '@/components/search/search'
import { Link } from 'react-router'

const Shop = () => {

  const [startValue, setStartValue] = React.useState(0);
  const [endValue, setEndValue] = React.useState(1500);
  const [startColumn, setColumn] = React.useState(3);

   const [colors, setColors] = useState('')
    const [categories, setCategories] = useState('')
    const [searchTerm, setSearchTerm] = useState('');  
    const [showAll, setShowAll] = useState(false);
    
const myColumns = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
};


    const { data: settingsData, isSuccess: isSettingsLoaded } = useQuery({
      queryKey: [QueryKeys.PAGINATIONSETTINGS],
      queryFn: async () => {
        const response = await getAPIData("paginationsettings");
        return response.data?.[0];
      },
    });
    
    const pageSize = settingsData?.pagesize ?? 5; 
    console.log(settingsData,"sizechecking")
    console.log(pageSize,"pageschecking")


    const { data } = useQuery({
      queryKey: [QueryKeys.PRODUCTS, startValue, endValue, colors, categories, searchTerm, showAll],
      queryFn: async () => {
        if (!isSettingsLoaded) return null;  
        let query = 'products?populate=*';
        if (!showAll) {
          query += `&pagination[page]=1&pagination[pageSize]=${pageSize}`;
        }
        if (colors) {
          query += `&filters[colors][name][$contains]=${encodeURIComponent(colors)}`;
          
        }
        console.log("just for checking:", query);  


        if (categories) {
          query += `&filters[categories][name][$contains]=${encodeURIComponent(categories)}`;
        }
        if (startValue !== null && endValue !== null) {
          query += `&filters[newp][$gte]=${encodeURIComponent(startValue)}&filters[newp][$lte]=${encodeURIComponent(endValue)}`;
        }
        if (searchTerm) {
          query += `&filters[name][$contains]=${encodeURIComponent(searchTerm)}`;
        }
        console.log("just for checking:", query);  
 
        return await getAPIData(query);
      },
      enabled: isSettingsLoaded, 
    });
    
    
    
  console.log(data)
  const { data: mydata } = useQuery({
    queryKey: [QueryKeys.CATEGORIES],
    queryFn: async () => await getAPIData("categories"),
  });
  console.log(mydata, "salam");
  
  const { data: maybe } = useQuery({
    queryKey: [QueryKeys.COLORS],
    queryFn: async () => await getAPIData("colors"),
  });
  console.log(maybe, "maybe");
  
  
  return (
    <div>
      <div
        className="relative h-[392px] w-full bg-cover bg-center lg:px-[160px] px-[32px]"
        style={{backgroundImage: `url(${Bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundClip: 'content-box', 
         }}
      >
        <div className="flex flex-col text-center items-center justify-center gap-[24px] h-full">
          <Breadcrumbs />
          <div className="text-[40px] lg:text-[54px] font-poppins capitalize font-medium leading-[44px] lg:leading-[58px] tracking-[-1px]">
            shop page
          </div>
          <div className=" text-base lg:text-[20px] font-inter font-normal leading-[26px]  lg:leading-[32px]">
            Let’s design the place you always imagined.
          </div>
        </div>
      </div>

      <div className="lg:px-[160px] md:px-[32px] px-[32px] pt-[60px] pb-[100px] grid grid-cols-12 gap-[24px]">
      <div className="lg:col-span-3 md:col-span-3 col-span-12">
      <div className='flex flex-col justify-start items-start gap-[32px]'>
<div className='flex justify-start items-center gap-[8px]'>
        <div><Filter className='w-[24px] h-[24px]'/></div>
        <div className='font-inter leading-[32px] text-[20px] font-semibold capitalize'>
filter            </div>
</div>
<div className='flex flex-col justify-start items-start gap-[16px]'>
<h1 className='mb-0 uppercase font-semibold font-inter text-base leading-[26px]'>
categories
            </h1>
            <ul className="text-list flex flex-col capitalize gap-[12px] text-sm font-semibold font-inter">
                {mydata && mydata?.data?.map((el) => (
                  <li
                    className="leading-[22px] cursor-pointer"
                    key={el.id}
                    onClick={() => {
                      setCategories(el.name === "all rooms" ? '' : el.name); setColors('');}}>
                    {el.name}
                  </li>
                ))}
              </ul>
</div>
<div className='flex flex-col justify-start items-start gap-[16px]'>
<h1 className='mb-0 uppercase font-semibold font-inter text-base leading-[26px]'>
colors
            </h1>
            <ul className="text-list flex flex-col capitalize gap-[12px] text-sm font-semibold font-inter">
                {maybe && maybe?.data?.map((el) => (
                  <li
                    className="leading-[22px] cursor-pointer"
                    key={el.id}
                    onClick={() => {
                      console.log("color:", el.name);
                      setColors(el.name);setCategories('');
                    }}
                    
                  >
          {el.name}
                  </li>
                ))}
              </ul>
</div>
<div className='w-full'>
<RangeSlider
  min={0}
  max={1500}
  defaultValue={[0, 1500]}
  value={0}
  onInput={(value) => {
    setStartValue(value[0]);
    setEndValue(value[1]);
  }}
/>

<div className="flex justify-between items-center my-3">
  <button>{startValue}</button>
  <button>{endValue}</button>
</div>

</div>
</div>
        </div>
       <div className='lg:col-span-9 md:col-span-9 col-span-12'>

       <div className='flex flex-col gap-[40px]'>
        <div className="flex flex-col lg:flex-row justify-between items-start">
        <div className='font-inter leading-[32px] text-[20px] font-semibold capitalize'>
              living room 
            </div>
<div className='flex justify-center gap-[32px]'>
  <div className='flex justify-center items-center gap-[4px]'>
<div className='font-inter text-base leading-[26px] font-semibold'>
  Sort by
</div>
<div>
<Chevron/>
</div>
  </div>
  <div className='justify-start items-start flex'>
  <div className='px-[11px] py-[8px]'>
<Nine onClick={() => setColumn(3)} className={startColumn === 3 ? 'opacity-60' : 'opacity-40'} />
</div>
<div className='px-[11px] py-[8px]'>
<Four onClick={() => setColumn(4)} className={startColumn === 4 ? 'opacity-100' : 'opacity-60'} />
</div>
<div className='px-[11px] py-[8px]'>
<Row onClick={() => setColumn(2)} className={startColumn === 2 ? 'opacity-100' : 'opacity-60'} />
</div>
<div className='px-[11px] py-[8px]'>
<Column onClick={() => setColumn(1)} className={startColumn === 1 ? 'opacity-100' : 'opacity-60'} />
</div>


  </div>

</div>
          </div>
          <Search onSearch={(value) => {
  setSearchTerm(value);setColors('');setCategories('');
}} />

       <div className='flex flex-col items-center justify-start gap-[80px] '>
<div className={`grid grid-cols-2 gap-[12px] w-full lg:gap-[24px] ${myColumns[startColumn]}`}>
       {data && data?.data?.map((el) => (
  <div key={el.id}>
  <Link to={`/shop/${el.id}`} >
  <Product
 
  name={el.name} 
  oldp={el.oldp} 
  announcement={el.announcement} 
  newp={el.newp} 
  image={
    el.image?.url 
      ? `http://localhost:1337${el.image.url}`  
      : "https://dummyimage.com/150"
  }
  colors={ [el.colors[0].name]}
  sale={el.sale}
  rating={el.rating}
/>

</Link>

</div>
))}

        </div>
        <button onClick={() => setShowAll(true)} className='flex text-center justify-center items-center font-inter  text-footbg text-base  tracking-[-0.4px] leading-[28px] font-medium border border-footbg rounded-[80px] py-[6px] px-[40px]'>
          Show more
        </button>
       </div>
        </div>
       </div>
      </div>
    </div>
  )
}

export default Shop
