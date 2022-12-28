import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
// @mui
import { Container, Typography, Grid, TableCell, TableRow,IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { ContainedButton } from '../../components/ContainedButton';
import { CustomSnackbar } from '../../components/CustomSnackbar';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { BasicTable } from '../../components/BasicTable';
// hooks
import useResponsive from '../../hooks/useResponsive';
// services
import { getNews, postNews, putNews } from '../../services/news';
// slices
import { setLoadingCreateNews, setLoadingNews, setNews, setLoadingEditNews } from '../../slices/news';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function CreateNews() {

  const { id } = useParams()

  const news = useSelector(state => state.news.news)
  const loadingNews = useSelector(state => state.news.loadingNews)
  const loadingCreateNews = useSelector(state => state.news.loadingCreateNews)
  const loadingEditNews = useSelector(state => state.news.loadingEditNews)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors }, setValue, watch, getValues } = useForm({
    defaultValues: {
      title: '',
      sumary: '',
      content: '',
      image: '',
      file: '',
      sectionTitle: '',
      sectionContent: '',
      sectionFile: '',
    }
  });

  useEffect(() => {

    if(id){
        const fetchNews = async () => {
            dispatch(setLoadingNews(true))
            
            setTimeout(async ()=> {
                const res = await getNews(id)
                dispatch(setNews(res))
                setFormValues()
                dispatch(setLoadingNews(false))
            }, 1000)
        }

        fetchNews()
    }
    
  }, [dispatch, id])

  const smUp = useResponsive('up', 'sm');

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')
  const [file, setFile] = React.useState(null)
  const [image, setImage] = React.useState(null)
  const [sectionFile, setSectionFile] = React.useState(null)

  const onSubmit = (event) => {
    if(!id){
        dispatch(setLoadingCreateNews(true))
    }else{
        dispatch(setLoadingEditNews(true))
    }

    console.log('event ', event);
    console.log('news ', news);
    console.log('sections ', sections);

    const body = {
     ...event,
     file,
     image,
     sections,
    }

    setTimeout(() => {
      const submitNews = async () => {
        let res = null;
  
        if(!id){
            res = await postNews(body)
            dispatch(setLoadingCreateNews(false))
        }else{
            res = await putNews(id, body)
            dispatch(setLoadingEditNews(false))
        }

        setColor(res ? 'success' : 'error')
        setOpen(true);

        if(res){
          setTimeout(() => {
            navigate('/dashboard/noticias')
          }, 2000)
        }
      }

      submitNews()
    }, 2000)
  }

  const setFormValues = () => {
    setValue("title", news?.title || '')
    setValue("sumary", news?.sumary || '')
    setValue("content", news?.content || '')
    setValue("image", news?.image || '')
    setValue("file", news?.file || '')


    // Falta setear file, image
    setFile({ name: news?.file || '' })
    setImage({ name: news?.image || '' })

    if(news?.sections?.length > 0){
        setSections(news.sections)
    }
  }

  const handleFileUpload = (files) => {
    setFile(files[0])
  }

  const handleImageUpload = (files) => {
    setImage(files[0])
  }

  const handleSectionFileUpload = (files) => {
    setSectionFile(files[0])
  }

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);

    setValue("sectionTitle", '')
    setValue("sectionContent", '')
    setValue("sectionFile", '')
    setSectionFile(null)
    setIsEditing(false)
  };

  const handleModalSave = () => {
    if(!isEditing){
        addSection()    
    }else{
        saveEditSection()
    }
    
    handleClose()
  }

  const [sections, setSections] = React.useState([]);
  const [indexSection, setIndexSection] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const headers = ['Subtítulo', 'Imagen/Archivo', ''];

  const addSection = () => {
    const newSections = [... sections, {
        title: getValues('sectionTitle'),
        content: getValues('sectionContent'),
        file: sectionFile,
    }]
  
      setSections(newSections)
      setValue("sectionTitle", '')
      setValue("sectionContent", '')
      setValue("sectionFile", '')
      setSectionFile(null)
  }

  const editSection = (index) => {
    handleClickOpen()
    setIsEditing(true)
    setIndexSection(index)

    const section = sections.find((_, i) => index === i)

    setValue("sectionTitle", section?.title || '')
    setValue("sectionContent", section?.content || '')
    setValue("sectionFile", section?.file?.name || '')
    setSectionFile(section.file)
  }

  const saveEditSection = () => {
    const newSections = [... sections];

    newSections[indexSection] = {
        title: getValues('sectionTitle'),
        content: getValues('sectionContent'),
        file: sectionFile,
    };
  
    setSections(newSections)
    setValue("sectionTitle", '')
    setValue("sectionContent", '')
    setValue("sectionFile", '')
    setSectionFile(null)
  }

  const deleteSection = (index) => {

    const newSections = [... sections]

    newSections.splice(index, 1)

    setSections(newSections)
  }

  return (
    <Page title={`${!id ? 'Crear' : 'Editar'} Noticia`}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {`${!id ? 'Crear' : 'Editar'} Noticia`}
        </Typography>

        {(id && loadingNews) ?
            <Loader /> :
            <FormCard>   
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Input
                                name='title'
                                label='Título'
                                placeholder='Ingrese el título de la noticia'
                                type='text'
                                control={control}
                                validations={{
                                    required: {
                                        value: true,
                                        message: 'El campo es requerido'
                                    }
                                }}
                                error={errors.title}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Input
                                name='content'
                                label='Contenido'
                                placeholder='Ingrese el contenido de la noticia'
                                multiline
                                type='text'
                                control={control}
                                validations={{
                                    required: {
                                    value: true,
                                    message: 'El campo es requerido'
                                    }
                                }}
                                error={errors.content}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Input
                                name='sumary'
                                label='Resumen'
                                placeholder='Ingrese un resumen de la noticia'
                                multiline
                                rows={2}
                                type='text'
                                control={control}
                                validations={{
                                    required: {
                                    value: true,
                                    message: 'Por favor ingresar un resumen de esta noticia para ser mostrado en el Home'
                                    }
                                }}
                                error={errors.sumary}
                            />
                        </Grid>

                        <Grid item xs={12} container direction="column">
                            <Input
                                name='image'
                                label='Imagen'
                                isFileUpload
                                accept='image/*'
                                control={control}
                                validations={{
                                    required: {
                                    value: true,
                                    message: 'Por favor seleccionar una imagen para esta noticia'
                                    },
                                }}
                                error={errors.image}
                                callback={handleImageUpload}
                                helperText={image?.name || ''}
                            />
                        </Grid>

                        <Grid item xs={12} container direction="column">
                            <Input
                                name='file'
                                label='Adjuntar Archivo'
                                isFileUpload
                                accept='.pdf, .doc, .docx, image/*, .xlsx'
                                control={control}
                                callback={handleFileUpload}
                                helperText={file?.name || ''}
                            />
                        </Grid>

                        <Grid container item direction="row" justifyContent="flex-end" alignItems="flex-end">
                            <OutlinedButton size='small' onClick={handleClickOpen}>
                                Añadir sección
                            </OutlinedButton>
                        </Grid>

                        {sections.length > 0 && 
                            <>
                                <Typography variant="h6" sx={{ pt: 2, pl: 2 }}>
                                    Secciones añadidas
                                </Typography>

                                <BasicTable headers={headers} elements={sections}>
                                    {(row, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row?.title || ''}</TableCell>
                                            <TableCell component="th" scope="row">{row?.file?.name || row?.file}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => editSection(index)} sx={{ p: 0 }}>
                                                    <Iconify icon="eva:edit-fill" width={24} height={24} />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => deleteSection(index)} sx={{ p: 0 }}>
                                                    <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </BasicTable>
                            </>
                        }

                        <Grid
                            container
                            item
                            spacing={2}
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            mt={8}
                        >
                            <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'} mb={!smUp ? 2 : 0}>
                            <OutlinedButton 
                                isRouterLink 
                                path="/dashboard/noticias"
                                defaultPadding
                                defaultMarginRight={smUp}
                            >
                                Volver
                            </OutlinedButton>
                            </GridStyle>

                            <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'}>
                            <ContainedButton type='submit' defaultPadding loading={!id ? loadingCreateNews : loadingEditNews}>
                                {!id ? 'Agregar' : 'Actualizar'}
                            </ContainedButton>
                            </GridStyle>
                        </Grid>

                    </Grid>
                </form>
            </FormCard>
        }

        <Modal 
            open={dialogOpen}
            handleClose={handleClose}
            handleSave={handleModalSave}
            title='Agregar Sección de Noticia'
            closeButtonText='Cancelar'
            saveButtonText={isEditing ? 'Editar' : 'Agregar'}
            disabledSaveButton={(!watch('sectionTitle') || !watch('sectionContent'))}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Input
                    name='sectionTitle'
                    label='Subtítulo'
                    placeholder='Ingrese el subtítulo'
                    type='text'
                    control={control}
                />
                </Grid>

                <Grid item xs={12}>
                <Input
                    name='sectionContent'
                    label='Contenido'
                    placeholder='Ingrese el contenido de la sección de la noticia'
                    multiline
                    type='text'
                    control={control}
                />
                </Grid>

                <Grid item xs={12} container direction="column">
                <Input
                    name='sectionFile'
                    label='Adjuntar Imagen o Archivo'
                    isFileUpload
                    accept='.pdf, .doc, .docx, image/*, .xlsx'
                    control={control}
                    callback={handleSectionFileUpload}
                    helperText={sectionFile?.name || sectionFile}
                />
                </Grid>
            </Grid>
        </Modal>

        <CustomSnackbar
          open={open}
          onClose={() => setOpen(false)}
          color={color}
        />
      </Container>
    </Page>
  );
}

export { CreateNews };
