import {useState, useEffect} from 'react';
import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import GameBanner from './components/GameBanner/GameBanner';
import CreateAdBanner from './components/CreateAdBanner/CreateAdBanner';
import * as Dialog from '@radix-ui/react-dialog';
import CreateAdModal from './components/CreateAdModal/CreateAdModal';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    };
}

function App() {
    const [games, setGames] = useState<Game[]>([]);
    const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
    const [updatedAds, setUpdatedAds] = useState<boolean>(false);

    useEffect(() => {
        axios('https://nlw-esports-jean.herokuapp.com/games').then((response) =>
            setGames(response.data),
        );
        setUpdatedAds(false);
    }, [updatedAds]);

    const navigate = useNavigate();

    const handleOpenGame = ({id, bannerUrl, title}: Game) => {
        {
            navigate(`/game/${id}`, {state: {id, bannerUrl, title}});
        }
    };

    return (
        <div className='max-w-[1344px] px-7 mx-auto flex-col flex items-center mt-20'>
            <img src={logoImg} alt='' />
            <h1 className='3xs:text-3xl 2xs:text-4xl xs:text-5xl sm:text-6xl text-white font-black 3xs:mt-12 sm:mt-20'>
                Seu{' '}
                <span className='bg-nlw-gradient bg-clip-text text-transparent'>
                    duo{' '}
                </span>
                está aqui.
            </h1>
            <div className='w-full 3xs:mt-12 sm:mt-16'>
                <Swiper
                    modules={[Navigation]}
                    navigation
                    grabCursor={true}
                    breakpoints={{
                        1: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        580: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        790: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        990: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                        1200: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {games.map((game) => (
                        <SwiperSlide key={game.id}>
                            <GameBanner
                                bannerUrl={game.bannerUrl}
                                title={game.title}
                                adsCount={game._count.ads}
                                onClick={() => handleOpenGame(game)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <Dialog.Root open={alertModalOpen} onOpenChange={setAlertModalOpen}>
                <CreateAdBanner />
                <CreateAdModal
                    onOpenAlertChange={setAlertModalOpen}
                    updateGamesAds={setUpdatedAds}
                />
            </Dialog.Root>
        </div>
    );
}

export default App;
