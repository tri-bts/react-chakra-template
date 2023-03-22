import PropTypes from 'prop-types';

import { useCallback, useState, useEffect } from 'react';

import SortableTree, {
  removeNodeAtPath,
  addNodeUnderParent,
  changeNodeAtPath,
} from '@nosferatu500/react-sortable-tree';

import { Box, Button, IconButton, Input, Text, useToast } from '@chakra-ui/react';
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
} from 'react-icons/ai';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { family_updateTree } from '../slice/family.slice';
import useSearchFamily from '../hooks/useSearchFamily';
import useCheckPermission from '../hooks/useCheckPermission';

const FamilyScreen = props => {
  const [treeData, setTreeData] = useState([{}]);
  const {
    search,
    searchFocusIndex,
    searchFoundCount,
    customSearchMethod,
    onSearchChange,
    searchFinishCallback,
    selectNextMatch,
    selectPrevMatch,
  } = useSearchFamily();

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const family_treeData = useSelector(state => state.family.family_treeData);
  const isCanEdit = useCheckPermission(['EDIT_TREE']);

  useEffect(() => {
    setTreeData(family_treeData);
  }, [family_treeData, location]);

  const onAddParent = useCallback(
    position => {
      if (position === 'top') {
        setTreeData([{ name: '', children: [] }].concat(...treeData));
      } else {
        setTreeData(
          treeData.concat({
            name: '',
            children: [],
          })
        );
      }
    },
    [treeData]
  );

  const addNodeFamily = useCallback((data, path) => {
    const result = addNodeUnderParent({
      treeData: data,
      parentKey: path[path.length - 1],
      expandParent: true,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: { name: '' },
      addAsFirstChild: false,
    });

    setTreeData(result.treeData);
  }, []);

  const removeNodeFamily = useCallback((data, path) => {
    const result = removeNodeAtPath({
      treeData: data,
      path,
      getNodeKey: ({ treeIndex }) => treeIndex,
    });
    setTreeData(result.length ? result : [{}]);
  }, []);

  const onInputValue = useCallback(
    (path, node) => event => {
      const name = event.target.value;

      setTreeData(
        changeNodeAtPath({
          treeData,
          path,
          getNodeKey: ({ treeIndex }) => treeIndex,
          newNode: { ...node, name },
        })
      );
    },
    [treeData]
  );

  const onSaveTreeData = useCallback(() => {
    dispatch(family_updateTree(treeData));

    toast({
      title: 'Success',
      description: 'Berhasil menyimpan silsilah keluarga',
      status: 'success',
      position: 'top-right',
    });
  }, [dispatch, treeData]);

  const onCancelEdit = useCallback(() => {
    navigate('/family-tree');
  }, []);

  return (
    <Box>
      <Box as="form" display="flex" alignItems="start" gap={5} mb={5} onSubmit={selectNextMatch}>
        <Box>
          <Input
            border="2px"
            borderColor="gray.500"
            placeholder="Search here"
            colorScheme="red"
            onChange={onSearchChange}
          />
          <Text>
            &nbsp;
            {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
            &nbsp;/&nbsp;
            {searchFoundCount || 0}
          </Text>
        </Box>
        <Box display="flex" alignItems="center" gap={3}>
          <IconButton
            colorScheme="blue"
            icon={<AiOutlineCaretLeft color="white" />}
            disabled={!searchFoundCount}
            onClick={selectPrevMatch}
          />
          <IconButton
            type="submit"
            colorScheme="blue"
            icon={<AiOutlineCaretRight color="white" />}
            disabled={!searchFoundCount}
            onClick={selectNextMatch}
          />
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={5}>
        {props.isEdit ? (
          <>
            <Button colorScheme="blue" onClick={() => onAddParent('bottom')}>
              Tambah Kepala Baru ke Bawah
            </Button>
            <Button colorScheme="blue" onClick={() => onAddParent('top')}>
              Tambah Kepala Baru ke Atas
            </Button>{' '}
          </>
        ) : (
          <Text fontSize="2xl">Silsilah Keluarga</Text>
        )}
      </Box>
      <Box h="70vh" py="4">
        <SortableTree
          treeData={treeData}
          onChange={setTreeData}
          canDrag={!!props.isEdit}
          searchQuery={search}
          searchFocusOffset={searchFocusIndex}
          searchMethod={customSearchMethod}
          searchFinishCallback={searchFinishCallback}
          isDynamicHeight={true}
          generateNodeProps={({ path, node }) => ({
            title: props.isEdit ? (
              <Input
                placeholder="Masukkan nama"
                colorScheme="red"
                value={node?.name || ''}
                onChange={onInputValue(path, node)}
                size="sm"
                variant="flushed"
              />
            ) : (
              <Text>{node.name || '-'}</Text>
            ),
            buttons: props.isEdit
              ? [
                  <IconButton
                    key="add_button"
                    variant="outlined"
                    icon={<AiFillPlusCircle color="green" />}
                    onClick={() => addNodeFamily(treeData, path)}
                  />,
                  <IconButton
                    key="remove_button"
                    variant="outlined"
                    icon={<AiFillCloseCircle color="red" />}
                    onClick={() => removeNodeFamily(treeData, path)}
                  />,
                ]
              : [],
          })}
        />
      </Box>

      {props.isEdit && (
        <Box display="flex" alignItems="center" gap={3}>
          <Button colorScheme="blue" variant="outlined" onClick={onCancelEdit}>
            Kembali
          </Button>
          <Button colorScheme="blue" onClick={onSaveTreeData}>
            Simpan
          </Button>
        </Box>
      )}

      {!props.isEdit && isCanEdit && (
        <Link to="/family-tree/edit">
          <Button colorScheme="orange">Ubah</Button>
        </Link>
      )}
    </Box>
  );
};

FamilyScreen.propTypes = {
  isEdit: PropTypes.bool,
};

export default FamilyScreen;
