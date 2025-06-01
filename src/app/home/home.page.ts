import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage {
  selectedFile: File | null = null;
  uploadProgress = 0;
  isUploading = false;
  uploadComplete = false;
  publicUrl = '';

  constructor(private supabase: SupabaseService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadComplete = false;
    this.publicUrl = '';
  }

  async uploadFile() {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.uploadProgress = 0;

    try {
      const filePath = `uploads/${Date.now()}_${this.selectedFile.name}`;
      await this.supabase.uploadFile('archivos', filePath, this.selectedFile);
      
      this.publicUrl = this.supabase.getPublicUrl('archivos', filePath);
      this.uploadComplete = true;
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      this.isUploading = false;
    }
  }
}