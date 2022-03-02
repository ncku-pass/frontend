import { ref, reactive } from 'vue';

export const useDeleteModal = () => {
  const showConfirmModal = ref(false);
  const deleteStatus = reactive({
    isPending: false,
    error: null
  });
  const closeConfirmModal = () => {
    if (deleteStatus.isPending) {
      return;
    }
    showConfirmModal.value = false;
  };
  const confirmDelete = () => {
    showConfirmModal.value = true;
  };

  return {
    showConfirmModal,
    deleteStatus,
    closeConfirmModal,
    confirmDelete
  };
};
