import { CapsuleItem, AppItem, LauncherConfig } from '../types';

export function generateKotlinComposeCode(
  config: LauncherConfig,
  capsules: CapsuleItem[],
  apps: AppItem[]
): string {
  const capsuleCode = capsules
    .map(
      (c) => `        AppCapsule(
            icon = Icons.Default.${mapIconToCompose(c.iconName)},
            name = "${c.name}",
            subText = "${c.subText}",
            accentColor = Color(${colorToComposeHex(c.accentColor)})
        )`
    )
    .join('\n\n');

  const appsCode = apps
    .map(
      (a) =>
        `        Pair("${a.name}", Icons.Default.${mapIconToCompose(a.iconName)})`
    )
    .join(',\n');

  const cornerRadiusDp = config.capsuleRadius;
  const gridColumns = config.gridColumns;

  return `package com.example.mylauncher

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                AuraLauncherScreen()
            }
        }
    }
}

@Composable
fun AuraLauncherScreen() {
    var isDrawerOpen by remember { mutableStateOf(false) }

    // Ana Arka Plan (OLED Glassmorphism)
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF090A0F))
    ) {
        // 1. ANA EKRAN (Uygulamaların Görünüşü)
        HomeScreen(
            modifier = Modifier.fillMaxSize(),
            onOpenDrawer = { isDrawerOpen = true }
        )

        // 2. UYGULAMA ÇEKMECESİ (App Drawer - Animasyonlu açılış)
        AnimatedVisibility(
            visible = isDrawerOpen,
            enter = slideInVertically(
                initialOffsetY = { it },
                animationSpec = tween(400)
            ),
            exit = slideOutVertically(
                targetOffsetY = { it },
                animationSpec = tween(300)
            )
        ) {
            AppDrawer(onClose = { isDrawerOpen = false })
        }
    }
}

@Composable
fun HomeScreen(modifier: Modifier = Modifier, onOpenDrawer: () -> Unit) {
    Column(
        modifier = modifier
            .padding(horizontal = 24.dp, vertical = 48.dp)
            // Yukarı kaydırma (Swipe Up) hareketi ile çekmeceyi açmak için
            .pointerInput(Unit) {
                detectDragGestures { change, dragAmount ->
                    change.consume()
                    if (dragAmount.y < -20) { // Yukarı kaydırma algılandı
                        onOpenDrawer()
                    }
                }
            },
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "Ana Ekran",
            color = Color.White,
            fontSize = 28.sp,
            fontWeight = FontWeight.Light,
            modifier = Modifier.padding(bottom = 24.dp)
        )

        // ANA EKRAN İKONLARI (Canlı Kapsül Görünümü)
${capsuleCode}

        Spacer(modifier = Modifier.weight(1f))
        
        // Çekmeceyi açmak için ipucu metni
        Text(
            text = "Çekmece için yukarı kaydır",
            color = Color.Gray,
            fontSize = 12.sp,
            modifier = Modifier.align(Alignment.CenterHorizontally)
        )
    }
}

@Composable
fun AppCapsule(icon: ImageVector, name: String, subText: String, accentColor: Color) {
    Surface(
        color = Color(0x1AFFFFFF), // Cam efekti (Glassmorphism)
        shape = RoundedCornerShape(${cornerRadiusDp}.dp),
        border = BorderStroke(1.dp, Color(0x33FFFFFF)),
        modifier = Modifier
            .fillMaxWidth()
            .height(80.dp)
            .clickable { /* Uygulamayı Aç */ }
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // İkon Kutusu
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(accentColor.copy(alpha = 0.2f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(imageVector = icon, contentDescription = name, tint = accentColor)
            }
            
            Spacer(modifier = Modifier.width(16.dp))
            
            // Metinler
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = name,
                    color = Color.White,
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
                Text(
                    text = subText,
                    color = Color.LightGray,
                    fontSize = 12.sp,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
            }
        }
    }
}

@Composable
fun AppDrawer(onClose: () -> Unit) {
    val dummyApps = listOf(
${appsCode}
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xE605070B)) // Koyu transparan arka plan
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(top = 48.dp)
        ) {
            // Kapatma butonu ve Başlık
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 24.dp, vertical = 16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = onClose) {
                    Icon(
                        imageVector = Icons.Default.KeyboardArrowDown,
                        contentDescription = "Kapat",
                        tint = Color.White,
                        modifier = Modifier.size(32.dp)
                    )
                }
                Text(
                    text = "Uygulamalar",
                    color = Color.White,
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Medium,
                    modifier = Modifier.padding(left = 8.dp)
                )
            }

            // Çekmece İçi Uygulama Izgarası (App Grid - ${gridColumns} Kolon - Canlı Renkli İkonlar)
            LazyVerticalGrid(
                columns = GridCells.Fixed(${gridColumns}),
                contentPadding = PaddingValues(24.dp),
                horizontalArrangement = Arrangement.spacedBy(16.dp),
                verticalArrangement = Arrangement.spacedBy(24.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(dummyApps) { app ->
                    val appColor = getAppVibrantColor(app.first)
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier.clickable { /* Uygulamayı Aç */ }
                    ) {
                        // Canlı Gradyan Dolgulu İkon Kutusu
                        Box(
                            modifier = Modifier
                                .size(60.dp)
                                .clip(CircleShape)
                                .background(
                                    Brush.linearGradient(
                                        colors = listOf(
                                            appColor,
                                            appColor.copy(alpha = 0.75f)
                                        )
                                    )
                                )
                                .border(1.dp, Color(0x40FFFFFF), CircleShape),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = app.second,
                                contentDescription = app.first,
                                tint = Color.White,
                                modifier = Modifier.size(28.dp)
                            )
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = app.first,
                            color = Color.White,
                            fontSize = 11.sp,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                    }
                }
            }
        }

        // 3. AYARLAR DÜĞMESİ (Sağ alt köşede, cam efektli)
        Surface(
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(24.dp)
                .size(64.dp),
            shape = RoundedCornerShape(20.dp),
            color = Color(0x1AFFFFFF), // Cam efekti
            border = BorderStroke(1.dp, Color(0x33FFFFFF)),
            shadowElevation = 8.dp
        ) {
            IconButton(onClick = { /* Çekmece ayarlarını aç */ }) {
                Icon(
                    imageVector = Icons.Default.Tune, 
                    contentDescription = "Çekmece Görünüm Ayarları",
                    tint = Color.White,
                    modifier = Modifier.size(28.dp)
                )
            }
        }
    }
}

// Canlı Uygulama Renkleri Eşlemesi
fun getAppVibrantColor(appName: String): Color {
    return when (appName.lowercase()) {
        "whatsapp" -> Color(0xFF25D366)
        "spotify" -> Color(0xFF1DB954)
        "youtube" -> Color(0xFFFF0033)
        "instagram" -> Color(0xFFE1306C)
        "galeri" -> Color(0xFFFF5252)
        "kamera" -> Color(0xFF38BDF8)
        "telegram" -> Color(0xFF229ED9)
        "play tv" -> Color(0xFFA855F7)
        "cloudstream repo" -> Color(0xFF0EA5E9)
        "github" -> Color(0xFF7C3AED)
        "ayarlar" -> Color(0xFF64748B)
        "watch list" -> Color(0xFFF59E0B)
        "chrome" -> Color(0xFFF59E0B)
        "termux" -> Color(0xFF10B981)
        "haritalar" -> Color(0xFF10B981)
        "discord" -> Color(0xFF5865F2)
        else -> Color(0xFFA855F7)
    }
}
`;
}

function mapIconToCompose(iconName: string): string {
  switch (iconName.toLowerCase()) {
    case 'messagesquare':
    case 'chat':
    case 'whatsapp':
      return 'Chat';
    case 'play':
    case 'playarrow':
      return 'PlayArrow';
    case 'clouddownload':
    case 'download':
      return 'CloudDownload';
    case 'image':
    case 'galeri':
      return 'Image';
    case 'code':
    case 'github':
      return 'Code';
    case 'camera':
    case 'cameraalt':
    case 'instagram':
      return 'CameraAlt';
    case 'photocamera':
    case 'kamera':
      return 'PhotoCamera';
    case 'settings':
    case 'ayarlar':
      return 'Settings';
    case 'music':
    case 'musicnote':
    case 'spotify':
      return 'MusicNote';
    case 'send':
    case 'telegram':
      return 'Send';
    case 'movie':
    case 'watchlist':
      return 'Movie';
    case 'playcircle':
    case 'youtube':
      return 'PlayCircle';
    case 'web':
    case 'chrome':
      return 'Web';
    case 'terminal':
      return 'Terminal';
    case 'tune':
      return 'Tune';
    default:
      return 'Star';
  }
}

function colorToComposeHex(hex: string): string {
  const clean = hex.replace('#', '');
  if (clean.length === 6) {
    return `0xFF${clean.toUpperCase()}`;
  }
  return `0xFF10B981`;
}

export const BUILD_GRADLE_KTS = `// app/build.gradle.kts
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.example.mylauncher"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.mylauncher"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.animation)
    implementation(libs.androidx.compose.material.icons.extended)
    implementation(libs.androidx.compose.ui.tooling.preview)
}
`;

export const ANDROID_MANIFEST_XML = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Aura Launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@android:style/Theme.NoTitleBar.Fullscreen">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTask"
            android:stateNotNeeded="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.HOME" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
`;
