
// import { useEffect, useMemo, useState } from 'react';
// import SoftBackdrop from '../components/SoftBackdrop';
// import { type IThumbnail } from '../assets/assets';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//     ArrowUpRightIcon,
//     DownloadIcon,
//     TrashIcon,
//     SearchIcon,
//     SlidersHorizontalIcon,
//     HeartIcon,
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import api from '../configs/api';
// import toast from 'react-hot-toast';

// const MyGeneration = () => {
//     const { isLoggedIn } = useAuth();
//     const navigate = useNavigate();

//     const aspectRatioClassMap: Record<string, string> = {
//         '16:9': 'aspect-video',
//         '1:1': 'aspect-square',
//         '9:16': 'aspect-[9/16]',
//     };

//     const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
//     const [loading, setLoading] = useState(false);

//     // Search & Filter states
//     const [search, setSearch] = useState('');
//     const [styleFilter, setStyleFilter] = useState('All');
//     const [colorFilter, setColorFilter] = useState('All');
//     const [sortOrder, setSortOrder] = useState('recent');
//     const [favoriteFilter, setFavoriteFilter] = useState('All');

//     const fetchThumbnails = async () => {
//         try {
//             setLoading(true);
//             const { data } = await api.get('/api/user/thumbnails');
//             setThumbnails(data.thumbnails || []);
//         } catch (error: any) {
//             console.error(error);
//             toast.error(error?.response?.data?.message || error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDownlaod = (image_url: string) => {
//         const link = document.createElement('a');
//         link.href = image_url.replace('/upload', '/upload/fl_attachment');
//         document.body.appendChild(link);
//         link.click();
//         link.remove();
//     };

//     const handleDelete = async (id: string) => {
//         try {
//             const confirm = window.confirm(
//                 'Are you sure you want to delete this thumbnail?'
//             );

//             if (!confirm) return;

//             const { data } = await api.delete(`/api/thumbnail/delete/${id}`);

//             toast.success(data.message);

//             setThumbnails((prev) => prev.filter((t) => t._id !== id));
//         } catch (error: any) {
//             console.error(error);
//             toast.error(error?.response?.data?.message || error.message);
//         }
//     };

//     // Favorite / Unfavorite
//     const handleFavorite = async (id: string) => {
//         try {
//             const { data } = await api.patch(
//                 `/api/thumbnail/favorite/${id}`
//             );

//             setThumbnails((prev) =>
//                 prev.map((thumb) =>
//                     thumb._id === id
//                         ? {
//                               ...thumb,
//                               isFavorite: data.isFavorite,
//                           }
//                         : thumb
//                 )
//             );

//             toast.success(data.message);
//         } catch (error: any) {
//             console.error(error);
//             toast.error(error?.response?.data?.message || error.message);
//         }
//     };

//     // Get unique styles and colors
//     const styles = useMemo(() => {
//         return [
//             'All',
//             ...Array.from(
//                 new Set(thumbnails.map((thumb) => thumb.style).filter(Boolean))
//             ),
//         ];
//     }, [thumbnails]);

//     const colors = useMemo(() => {
//         return [
//             'All',
//             ...Array.from(
//                 new Set(
//                     thumbnails
//                         .map((thumb) => thumb.color_scheme)
//                         .filter(Boolean)
//                 )
//             ),
//         ];
//     }, [thumbnails]);

//     // Search, filter and sort thumbnails
//     const filteredThumbnails = useMemo(() => {
//         let result = [...thumbnails];

//         // Search by title
//         if (search.trim()) {
//             const searchText = search.toLowerCase();

//             result = result.filter((thumb) =>
//                 thumb.title?.toLowerCase().includes(searchText)
//             );
//         }

//         // Filter by style
//         if (styleFilter !== 'All') {
//             result = result.filter(
//                 (thumb) => thumb.style === styleFilter
//             );
//         }

//         // Filter by color
//         if (colorFilter !== 'All') {
//             result = result.filter(
//                 (thumb) => thumb.color_scheme === colorFilter
//             );
//         }

//         // Sort by date
//         result.sort((a, b) => {
//             const dateA = new Date(a.createdAt || 0).getTime();
//             const dateB = new Date(b.createdAt || 0).getTime();

//             return sortOrder === 'recent'
//                 ? dateB - dateA
//                 : dateA - dateB;
//         });

//         return result;
//     }, [thumbnails, search, styleFilter, colorFilter, sortOrder]);

//     useEffect(() => {
//         if (isLoggedIn) {
//             fetchThumbnails();
//         } else {
//             setThumbnails([]);
//         }
//     }, [isLoggedIn]);

//     return (
//         <>
//             <SoftBackdrop />

//             <div className='mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32'>

//                 {/* HEADER */}
//                 <div className='mb-8'>
//                     <h1 className='text-2xl font-bold text-zinc-200'>
//                         My Generations
//                     </h1>

//                     <p className='text-sm text-zinc-400 mt-1'>
//                         View and manage all your AI-generated thumbnails
//                     </p>
//                 </div>

//                 {/* SEARCH & FILTERS */}
//                 {!loading && thumbnails.length > 0 && (
//                     <div className='mb-8 space-y-4'>

//                         {/* SEARCH BAR */}
//                         <div className='relative max-w-xl'>
//                             <SearchIcon className='absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400' />

//                             <input
//                                 type='text'
//                                 value={search}
//                                 onChange={(e) => setSearch(e.target.value)}
//                                 placeholder='Search thumbnails by title...'
//                                 className='w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500'
//                             />
//                         </div>

//                         {/* FILTERS */}
//                         <div className='flex flex-wrap items-center gap-3'>

//                             <div className='flex items-center gap-2 text-zinc-400'>
//                                 <SlidersHorizontalIcon className='size-4' />
//                                 <span className='text-sm'>Filter:</span>
//                             </div>

//                             {/* STYLE */}
//                             <select
//                                 value={styleFilter}
//                                 onChange={(e) =>
//                                     setStyleFilter(e.target.value)
//                                 }
//                                 className='px-3 py-2 rounded-lg border border-white/10 bg-white/6 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-pink-500'
//                             >
//                                 {styles.map((style) => (
//                                     <option
//                                         key={style}
//                                         value={style}
//                                         className='bg-black'
//                                     >
//                                         {style}
//                                     </option>
//                                 ))}
//                             </select>

//                             {/* COLOR */}
//                             <select
//                                 value={colorFilter}
//                                 onChange={(e) =>
//                                     setColorFilter(e.target.value)
//                                 }
//                                 className='px-3 py-2 rounded-lg border border-white/10 bg-white/6 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-pink-500'
//                             >
//                                 {colors.map((color) => (
//                                     <option
//                                         key={color}
//                                         value={color}
//                                         className='bg-black'
//                                     >
//                                         {color}
//                                     </option>
//                                 ))}
//                             </select>

//                             {/* SORT */}
//                             <select
//                                 value={sortOrder}
//                                 onChange={(e) =>
//                                     setSortOrder(e.target.value)
//                                 }
//                                 className='px-3 py-2 rounded-lg border border-white/10 bg-white/6 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-pink-500'
//                             >
//                                 <option value='recent' className='bg-black'>
//                                     Recent
//                                 </option>

//                                 <option value='oldest' className='bg-black'>
//                                     Oldest
//                                 </option>
//                             </select>

//                             {/* FAVORITES */}
//                             <select
//                                 value={favoriteFilter}
//                                 onChange={(e) =>
//                                     setFavoriteFilter(e.target.value)
//                                 }
//                                 className='px-3 py-2 rounded-lg border border-white/10 bg-white/6 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-pink-500'
//                             >
//                                 <option value='All' className='bg-black'>
//                                     All
//                                 </option>

//                                 <option
//                                     value='Favorites'
//                                     className='bg-black'
//                                 >
//                                     Favorites
//                                 </option>
//                             </select>

//                         </div>
//                     </div>
//                 )}

//                 {/* LOADING */}
//                 {loading && (
//                     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
//                         {Array.from({ length: 6 }).map((_, i) => (
//                             <div
//                                 key={i}
//                                 className='rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]'
//                             />
//                         ))}
//                     </div>
//                 )}

//                 {/* EMPTY STATE */}
//                 {!loading && thumbnails.length === 0 && (
//                     <div className='text-center py-24'>
//                         <h3 className='text-lg font-semibold text-zinc-200'>
//                             No thumbnails yet
//                         </h3>

//                         <p className='text-sm text-zinc-400 mt-2'>
//                             Generate your first thumbnail to see it here
//                         </p>
//                     </div>
//                 )}

//                 {/* NO SEARCH RESULTS */}
//                 {!loading &&
//                     thumbnails.length > 0 &&
//                     filteredThumbnails.length === 0 && (
//                         <div className='text-center py-20'>
//                             <h3 className='text-lg font-semibold text-zinc-200'>
//                                 No thumbnails found
//                             </h3>

//                             <p className='text-sm text-zinc-400 mt-2'>
//                                 Try changing your search or filters
//                             </p>
//                         </div>
//                     )}

//                 {/* GRID */}
//                 {!loading && filteredThumbnails.length > 0 && (
//                     <div className='columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8'>

//                         {filteredThumbnails.map((thumb: IThumbnail) => {

//                             const aspectClass =
//                                 aspectRatioClassMap[
//                                     thumb.aspect_ratio || '16:9'
//                                 ];

//                             return (
//                                 <div
//                                     key={thumb._id}
//                                     onClick={() =>
//                                         navigate(`/generate/${thumb._id}`)
//                                     }
//                                     className='mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 transition shadow-xl break-inside-avoid'
//                                 >

//                                     {/* IMAGE */}
//                                     <div
//                                         className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}
//                                     >
//                                         {thumb.image_url ? (
//                                             <img
//                                                 src={thumb.image_url}
//                                                 alt={thumb.title}
//                                                 className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
//                                             />
//                                         ) : (
//                                             <div className='w-full h-full flex items-center justify-center text-sm text-zinc-400'>
//                                                 {thumb.isGenerating
//                                                     ? 'Generating…'
//                                                     : 'No image'}
//                                             </div>
//                                         )}

//                                         {thumb.isGenerating && (
//                                             <div className='absolute inset-0 bg-black/50 flex items-center justify-center text-sm font-medium text-white'>
//                                                 Generating…
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* CONTENT */}
//                                     <div className='p-4 space-y-2'>

//                                         <h3 className='text-sm font-semibold text-zinc-100 line-clamp-2'>
//                                             {thumb.title}
//                                         </h3>

//                                         <div className='flex flex-wrap gap-2 text-xs text-zinc-400'>

//                                             <span className='px-2 py-0.5 rounded bg-white/8'>
//                                                 {thumb.style}
//                                             </span>

//                                             <span className='px-2 py-0.5 rounded bg-white/8'>
//                                                 {thumb.color_scheme}
//                                             </span>

//                                             <span className='px-2 py-0.5 rounded bg-white/8'>
//                                                 {thumb.aspect_ratio}
//                                             </span>

//                                         </div>

//                                         <p className='text-xs text-zinc-500'>
//                                             {thumb.createdAt
//                                                 ? new Date(
//                                                       thumb.createdAt
//                                                   ).toDateString()
//                                                 : 'Date unavailable'}
//                                         </p>

//                                     </div>

//                                     {/* ACTION BUTTONS */}
//                                     <div
//                                         onClick={(e) => e.stopPropagation()}
//                                         className='absolute bottom-2 right-2 max-sm:flex sm:hidden group-hover:flex gap-1.5'
//                                     >

//                                         {/* FAVORITE */}
//                                         <HeartIcon
//                                             onClick={() =>
//                                                 handleFavorite(thumb._id)
//                                             }
//                                             fill={
//                                                 thumb.isFavorite
//                                                     ? 'currentColor'
//                                                     : 'none'
//                                             }
//                                             className={`size-6 p-1 rounded transition-all ${
//                                                 thumb.isFavorite
//                                                     ? 'text-pink-500 bg-black/50'
//                                                     : 'bg-black/50 hover:bg-pink-600'
//                                             }`}
//                                         />

//                                         {/* DELETE */}
//                                         <TrashIcon
//                                             onClick={() =>
//                                                 handleDelete(thumb._id)
//                                             }
//                                             className='size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all'
//                                         />

//                                         {/* DOWNLOAD */}
//                                         <DownloadIcon
//                                             onClick={() =>
//                                                 handleDownlaod(
//                                                     thumb.image_url!
//                                                 )
//                                             }
//                                             className='size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all'
//                                         />

//                                         {/* PREVIEW */}
//                                         <Link
//                                             target='_blank'
//                                             to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`}
//                                         >
//                                             <ArrowUpRightIcon className='size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all' />
//                                         </Link>

//                                     </div>

//                                 </div>
//                             );
//                         })}

//                     </div>
//                 )}

//             </div>
//         </>
//     );
// };

// export default MyGeneration;
import { useEffect, useMemo, useState } from 'react';
import SoftBackdrop from '../components/SoftBackdrop';
import { type IThumbnail } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowUpRightIcon,
    DownloadIcon,
    TrashIcon,
    SearchIcon,
    SlidersHorizontalIcon,
    HeartIcon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../configs/api';
import toast from 'react-hot-toast';

const MyGeneration = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const aspectRatioClassMap: Record<string, string> = {
        '16:9': 'aspect-video',
        '1:1': 'aspect-square',
        '9:16': 'aspect-[9/16]',
    };

    const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
    const [loading, setLoading] = useState(false);

    // Search & Filter states
    const [search, setSearch] = useState('');
    const [styleFilter, setStyleFilter] = useState('All');
    const [colorFilter, setColorFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('recent');
    const [favoriteOnly, setFavoriteOnly] = useState(false);

    const fetchThumbnails = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/api/user/thumbnails');
            setThumbnails(data.thumbnails || []);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDownlaod = (image_url: string) => {
        const link = document.createElement('a');
        link.href = image_url.replace('/upload', '/upload/fl_attachment');
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const handleDelete = async (id: string) => {
        try {
            const confirm = window.confirm(
                'Are you sure you want to delete this thumbnail?'
            );

            if (!confirm) return;

            const { data } = await api.delete(`/api/thumbnail/delete/${id}`);

            toast.success(data.message);

            setThumbnails((prev) => prev.filter((t) => t._id !== id));
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    // Favorite / Unfavorite
    const handleFavorite = async (id: string) => {
        try {
            const { data } = await api.patch(
                `/api/thumbnail/favorite/${id}`
            );

            setThumbnails((prev) =>
                prev.map((thumb) =>
                    thumb._id === id
                        ? {
                              ...thumb,
                              isFavorite: data.isFavorite,
                          }
                        : thumb
                )
            );

            toast.success(data.message);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    // Get unique styles and colors
    const styles = [
    'All',
    'Bold & Graphic',
    'Tech/Futuristic',
    'Minimalist',
    'Photorealistic',
    'Illustrated',
];

    const colors = useMemo(() => {
        return [
            'All',
            ...Array.from(
                new Set(
                    thumbnails
                        .map((thumb) => thumb.color_scheme)
                        .filter(Boolean)
                )
            ),
        ];
    }, [thumbnails]);

    // Search, filter and sort thumbnails
    const filteredThumbnails = useMemo(() => {
        let result = [...thumbnails];

        // Search by title
        if (search.trim()) {
            const searchText = search.toLowerCase();

            result = result.filter((thumb) =>
                thumb.title?.toLowerCase().includes(searchText)
            );
        }

        // Filter by style
        if (styleFilter !== 'All') {
            result = result.filter(
                (thumb) => thumb.style === styleFilter
            );
        }

        // Filter by color
        if (colorFilter !== 'All') {
            result = result.filter(
                (thumb) => thumb.color_scheme === colorFilter
            );
        }
        if (favoriteOnly) {
    result = result.filter((thumb) => thumb.isFavorite);
}

        // Sort by date
        result.sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();

            return sortOrder === 'recent'
                ? dateB - dateA
                : dateA - dateB;
        });

        return result;
    },  [thumbnails, search, styleFilter, colorFilter, sortOrder, favoriteOnly]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchThumbnails();
        } else {
            setThumbnails([]);
        }
    }, [isLoggedIn]);

    return (
        <>
            <SoftBackdrop />

            <div className='mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32'>

                {/* HEADER */}
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold text-zinc-200'>
                        My Generations
                    </h1>

                    <p className='text-sm text-zinc-400 mt-1'>
                        View and manage all your AI-generated thumbnails
                    </p>
                </div>

                {/* SEARCH & FILTERS */}
                {!loading && thumbnails.length > 0 && (
                    <div className='mb-8 space-y-4'>

                        {/* SEARCH BAR */}
                        <div className='relative max-w-xl'>
                            <SearchIcon className='absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400' />

                            <input
                                type='text'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder='Search thumbnails by title...'
                                className='w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500'
                            />
                        </div>

                        {/* FILTERS */}
                        <div className='flex flex-wrap items-center gap-3'>

                            <div className='flex items-center gap-2 text-zinc-400'>
                                <SlidersHorizontalIcon className='size-4' />
                                <span className='text-sm'>Filter:</span>
                            </div>

                            {/* STYLE */}
                            <select
                                value={styleFilter}
                                onChange={(e) =>
                                    setStyleFilter(e.target.value)
                                }
                                className='px-3 py-2 rounded-lg border border-white/10 bg-white/6 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-pink-500'
                            >
                                {styles.map((style) => (
                                    <option
                                        key={style}
                                        value={style}
                                        className='bg-black'
                                    >
                                        {style}
                                    </option>
                                ))}
                            </select>

                            {/* COLOR */}
                            <select
                                value={colorFilter}
                                onChange={(e) =>
                                    setColorFilter(e.target.value)
                                }
                                className='px-3 py-2 rounded-lg border border-white/10 bg-white/6 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-pink-500'
                            >
                                {colors.map((color) => (
                                    <option
                                        key={color}
                                        value={color}
                                        className='bg-black'
                                    >
                                        {color}
                                    </option>
                                ))}
                            </select>

                            {/* SORT */}
                            <select
                                value={sortOrder}
                                onChange={(e) =>
                                    setSortOrder(e.target.value)
                                }
                                className='px-3 py-2 rounded-lg border border-white/10 bg-white/6 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-pink-500'
                            >
                                <option value='recent' className='bg-black'>
                                    Recent
                                </option>

                                <option value='oldest' className='bg-black'>
                                    Oldest
                                </option>
                            </select>
                            <button
    type='button'
    onClick={() => setFavoriteOnly((prev) => !prev)}
    className={`size-10 rounded-lg border flex items-center justify-center transition-all ${
        favoriteOnly
            ? 'bg-pink-600 border-pink-500 text-white'
            : 'bg-white/6 border-white/10 text-zinc-300 hover:bg-white/10'
    }`}
    aria-label='Show favorites'
>
    <HeartIcon
        size={18}
        fill={favoriteOnly ? 'currentColor' : 'none'}
    />
</button>

                        </div>
                    </div>
                )}

                {/* LOADING */}
                {loading && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className='rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]'
                            />
                        ))}
                    </div>
                )}

                {/* EMPTY STATE */}
                {!loading && thumbnails.length === 0 && (
                    <div className='text-center py-24'>
                        <h3 className='text-lg font-semibold text-zinc-200'>
                            No thumbnails yet
                        </h3>

                        <p className='text-sm text-zinc-400 mt-2'>
                            Generate your first thumbnail to see it here
                        </p>
                    </div>
                )}

                {/* NO SEARCH RESULTS */}
                {!loading &&
                    thumbnails.length > 0 &&
                    filteredThumbnails.length === 0 && (
                        <div className='text-center py-20'>
                            <h3 className='text-lg font-semibold text-zinc-200'>
                                No thumbnails found
                            </h3>

                            <p className='text-sm text-zinc-400 mt-2'>
                                Try changing your search or filters
                            </p>
                        </div>
                    )}

                {/* GRID */}
                {!loading && filteredThumbnails.length > 0 && (
                    <div className='columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8'>

                        {filteredThumbnails.map((thumb: IThumbnail) => {

                            const aspectClass =
                                aspectRatioClassMap[
                                    thumb.aspect_ratio || '16:9'
                                ];

                            return (
                                <div
                                    key={thumb._id}
                                    onClick={() =>
                                        navigate(`/generate/${thumb._id}`)
                                    }
                                    className='mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 transition shadow-xl break-inside-avoid'
                                >

                                    {/* IMAGE */}
                                    <div
                                        className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}
                                    >
                                        {thumb.image_url ? (
                                            <img
                                                src={thumb.image_url}
                                                alt={thumb.title}
                                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                            />
                                        ) : (
                                            <div className='w-full h-full flex items-center justify-center text-sm text-zinc-400'>
                                                {thumb.isGenerating
                                                    ? 'Generating…'
                                                    : 'No image'}
                                            </div>
                                        )}

                                        {thumb.isGenerating && (
                                            <div className='absolute inset-0 bg-black/50 flex items-center justify-center text-sm font-medium text-white'>
                                                Generating…
                                            </div>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className='p-4 space-y-2'>

                                        <h3 className='text-sm font-semibold text-zinc-100 line-clamp-2'>
                                            {thumb.title}
                                        </h3>

                                        <div className='flex flex-wrap gap-2 text-xs text-zinc-400'>

                                            <span className='px-2 py-0.5 rounded bg-white/8'>
                                                {thumb.style}
                                            </span>

                                            <span className='px-2 py-0.5 rounded bg-white/8'>
                                                {thumb.color_scheme}
                                            </span>

                                            <span className='px-2 py-0.5 rounded bg-white/8'>
                                                {thumb.aspect_ratio}
                                            </span>

                                        </div>

                                        <p className='text-xs text-zinc-500'>
                                            {thumb.createdAt
                                                ? new Date(
                                                      thumb.createdAt
                                                  ).toDateString()
                                                : 'Date unavailable'}
                                        </p>

                                    </div>

                                    {/* ACTION BUTTONS */}
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className='absolute bottom-2 right-2 max-sm:flex sm:hidden group-hover:flex gap-1.5'
                                    >

                                        {/* FAVORITE */}
                                        <HeartIcon
                                            onClick={() =>
                                                handleFavorite(thumb._id)
                                            }
                                            fill={
                                                thumb.isFavorite
                                                    ? 'currentColor'
                                                    : 'none'
                                            }
                                            className={`size-6 p-1 rounded transition-all ${
                                                thumb.isFavorite
                                                    ? 'text-pink-500 bg-black/50'
                                                    : 'bg-black/50 hover:bg-pink-600'
                                            }`}
                                        />

                                        {/* DELETE */}
                                        <TrashIcon
                                            onClick={() =>
                                                handleDelete(thumb._id)
                                            }
                                            className='size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all'
                                        />

                                        {/* DOWNLOAD */}
                                        <DownloadIcon
                                            onClick={() =>
                                                handleDownlaod(
                                                    thumb.image_url!
                                                )
                                            }
                                            className='size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all'
                                        />

                                        {/* PREVIEW */}
                                        <Link
                                            target='_blank'
                                            to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`}
                                        >
                                            <ArrowUpRightIcon className='size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all' />
                                        </Link>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>
        </>
    );
};

export default MyGeneration;