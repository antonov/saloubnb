'use client';

import useRentModal from "@/app/hooks/useRentModal";
import {useCallback, useMemo, useState} from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Modal from './Modal';
import Heading from '../Heading';

import { categories } from '../navbar/Categories'
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CountrySelect from "@/app/components/inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "@/app/components/inputs/Counter";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import imageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}



const RentModal = () => {
    const rentModal = useRentModal();
    const router = useRouter();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const onNext = () => {
      setStep((value) => value + 1);
    };
    const onBack = () => {
      setStep((value) => value - 1);
    };

    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors, },
      reset
    } = useForm<FieldValues>({
      defaultValues: {
        category: '',
        location: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: '',
        price: 1,
        title: '',
        description: '',
      }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');
    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {shouldTouch: true, shouldDirty:true, shouldValidate:true});
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      if (step !== STEPS.PRICE) {
        return onNext()
      }
      setIsLoading(true);
      axios.post('/api/listings', data).then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      }).catch(() => {
        toast.error("Something went wrong.")
      }).finally(() => {
        setIsLoading(false);
      }) ;
    }
    

    let bodyContent = (
        <div className='flex flex-col gap-8'>
          <Heading title="Which of these describes best your place?"
                   subtitle="Pick a category"/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            { categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick = {(category) => {setCustomValue('category', category)}}
                  selected = {category === item.label}
                  icon={item.icon}
                  label={item.label}
                />
              </div>
            ))}
          </div>
        </div>
    );

    const Map = useMemo(
      () => (dynamic(() => import ('../Map'), { ssr: false })),
      [location]
    );
    if (step === STEPS.LOCATION) {
      bodyContent = (
        <div className='flex flex-col gap-8'>
          <Heading title="Where is your place located?"
                   subtitle="How guests find you."/>
          <CountrySelect
            value={location}
            onChange={
              (value) => {
                setCustomValue('location', value)
              }
            }
          />
          <Map center={location?.latLng}/>
        </div>
      );

    }
    
    if (step === STEPS.INFO) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Share some basics about your place"
                   subtitle="What amenities do you have?"/>
          <Counter
            onChange={
              (value) => {
                setCustomValue('guestCount', value)
              }
            }
            title="Number of guests"
            subtitle="How many guests do you allow?"
            value={guestCount} />
          <Counter
            onChange={
              (value) => {
                setCustomValue('roomCount', value)
              }
            }
            title="Number of rooms"
            subtitle="How many rooms do you have?"
            value={roomCount} />

          <Counter
            onChange={
              (value) => {
                setCustomValue('bathroomCount', value)
              }
            }
            title="Number of bathrooms"
            subtitle="How many bathrooms do you have?"
            value={bathroomCount} />
        </div>

      )
    }

    if (step === STEPS.IMAGES) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Add a photo of your place"
                   subtitle="Show your guests what your place looks like!"/>
          <ImageUpload value={imageSrc} onChange={
            (value) => {
              setCustomValue('imageSrc', value)
            }
          }/>
        </div>
      )
    }

    if (step === STEPS.DESCRIPTION) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="How you wold describe your place?"
                   subtitle="Short and sweet works best!"/>
           <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required  />
           <hr/>
           <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required  />
        </div>
      )
    }

    if (step === STEPS.PRICE) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Now, set your price."
                   subtitle="How much do you charge per night ?"/>
          <Input id="price" label="Price" formatPrice type="number" disabled={isLoading} register={register} errors={errors} required  />

        </div>
      )
    }

    const actionLabel = useMemo(() => {
      if (step === STEPS.PRICE) {
        return 'Create';
      }

      return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
      if (step === STEPS.CATEGORY) {
        return undefined;
      }

      return 'Back';
    }, [step]);

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>

        </div>
    );

    return (
    <Modal
    disabled={false}
    isOpen={rentModal.isOpen}
    title="Saloubnb your home"
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
        );
}
 
export default RentModal;