import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import PostShare from '../PostShare/PostShare';

function ShareModal({modalOpened,setModalOpened}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={()=>setModalOpened(false)}
        size='55%'
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <PostShare/>
      </Modal>
    </>
  );
}

export default ShareModal