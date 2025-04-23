import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ImageIcon as Image, Pencil, Trash, Video } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import MediaEditor from '@/components/admin/media/MediaEditor';
import { MediaItem, getAllMedia, createMedia, updateMedia, deleteMedia } from '@/utils/media/mediaOperations';

const MediaManagement = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<MediaItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    setMedia(getAllMedia());
  }, []);

  const handleAddNew = () => {
    const newMediaItem: MediaItem = {
      id: `media-${Date.now()}`,
      type: 'image',
      title: '',
      date: new Date().toLocaleDateString('ru-RU'),
      thumbnail: '',
      url: '',
      category: 'match'
    };
    setCurrentMedia(newMediaItem);
    setEditMode(true);
  };

  const handleEdit = (mediaItem: MediaItem) => {
    setCurrentMedia(mediaItem);
    setEditMode(true);
  };

  const handleConfirmDelete = (mediaId: string) => {
    setConfirmDelete(mediaId);
  };

  const handleDeleteConfirmed = () => {
    if (!confirmDelete) return;
    
    try {
      deleteMedia(confirmDelete);
      setMedia(getAllMedia());
      toast({
        title: "Медиафайл удален",
        description: "Медиафайл был успешно удален",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось удалить медиафайл",
      });
    }
    setConfirmDelete(null);
  };

  const handleSave = (updatedMedia: MediaItem) => {
    try {
      const isExisting = media.some(m => m.id === updatedMedia.id);
      if (isExisting) {
        updateMedia(updatedMedia);
        toast({
          title: "Медиафайл обновлен",
          description: "Медиафайл успешно обновлен",
        });
      } else {
        createMedia(updatedMedia);
        toast({
          title: "Медиафайл добавлен",
          description: "Новый медиафайл успешно добавлен",
        });
      }
      setMedia(getAllMedia());
      setEditMode(false);
      setCurrentMedia(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось сохранить медиафайл",
      });
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setCurrentMedia(null);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <div>
      <Card className="mb-8 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-fc-green mr-3 flex items-center justify-center">
                <Image className="h-4 w-4 text-white" />
              </div>
              <span>Медиагалерея</span>
            </div>
          </CardTitle>
          <Button onClick={handleAddNew} className="bg-fc-green hover:bg-fc-darkGreen">
            <Plus className="mr-2 h-4 w-4" /> Добавить медиафайл
          </Button>
        </CardHeader>
      </Card>

      {editMode && currentMedia ? (
        <MediaEditor
          media={currentMedia}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((item) => (
            <Card key={item.id} className="relative group">
              <div className="relative aspect-video">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Video className="h-12 w-12 text-white" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1 line-clamp-1">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-xs">
                      {item.category}
                    </span>
                    <span className="ml-2">{item.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleConfirmDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {media.length === 0 && (
            <Card className="col-span-full p-12 text-center">
              <div className="text-gray-500 mb-4">Медиафайлы не найдены</div>
              <Button onClick={handleAddNew} variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Добавить первый медиафайл
              </Button>
            </Card>
          )}
        </div>
      )}

      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить этот медиафайл? Это действие нельзя будет отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDelete}>Отмена</Button>
            <Button variant="destructive" onClick={handleDeleteConfirmed}>Удалить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaManagement;