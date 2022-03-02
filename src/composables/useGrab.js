import { ref } from 'vue';

const isGrabbing = ref(false);

const useGrab = () => {
  const setIsGrabbing = toStatus => {
    isGrabbing.value = toStatus;
  };

  return { isGrabbing, setIsGrabbing };
};

export default useGrab;
