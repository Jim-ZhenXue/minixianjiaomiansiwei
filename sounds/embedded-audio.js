/**
 * 嵌入式音频解决方案 - 使用base64编码直接嵌入小型音频数据
 * 这种方法可以避免文件路径和加载问题
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('启动嵌入式音频解决方案...');
    
    // 创建一个非常短的"滴"声音效作为备选 (base64编码的WAV文件)
    const beepSoundBase64 = 'data:audio/wav;base64,UklGRnQGAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YU8GAACBgIF/gn6Dfn+AgIF/gn2Dfn+AgIB/gYCBfX5/gIF/gYF/f4B/f4B/gIF/gn6Dfn+Af4B+gIB/f4B/f4B/gIF/gIF/gYF/gH+Af3+AgH+Af4CBgIGAgoCBgH+AgH59fXx9fH18fX19fn9/gICBgoODg4SEhIODgoKBgH9+fXx7enl4d3Z1dHRzc3N0dHV2d3h5ent8fX6AgYKDhIWGh4iJiYqKiouKiomIh4aEg4GAfXt5dnRxbmxpZ2RiYF5cWlhaWVlaW11eYGJkZmhrbW9yc3Z4e31/goSGiYuNj5GSlJWWl5iYmJiXlpWTkpCOjIqHhIJ/fHp3dHFvbGloZWNhX11cWllaWVpbXF5fYWNmZ2ptb3F0dnh6fX+BhIaIio2OkJKTlJWWlpaWlZSSkI+Mi4iFgn98eXdzb2xpZmNgXltZV1ZVVFRUVVZXWVtdX2FkZmlrbG9xc3V3eXx+gIKEhoiKi46PkZKTlJSUlJOSkZCOjIqIhYOAfXt4dnNwbWpoZWNgXl1bWVhXVlZWVlZXWFpcXmBiZGZoam1ucHJ0dnh6fH5/gYOFhoiJi4yNjo+PkI+PjYyLioiGhIKAfnx6eHVzcW9sa2lnZWNhYF5dXFtbW1tcXV5fYGJjZWZoaWptbnBxc3R2d3l6e31+f4CBgoOEhIWFhYWFhISDgoGAf359fHt6eXh3d3Z1dXV1dXV2d3d4eXp7fH1+f4CBgoKDhISEhISEg4OCgYB/fn18e3p5eHd2dXV0dHR0dHR1dXZ3eHl6e3x9fn+AgYKCg4SEhISEhISDgoKBgH9+fXx7enl4d3Z2dXV0dHR0dXV2d3h5ent8fX6AgYGCg4SEhYWFhYWEhIOCgYCAf359fHt6eXh3d3Z1dXV1dXV2dnd4eXp7fH1+f4CBgoODhISFhYWFhISDgoKBgH9+fXx7enl4d3Z2dXV0dHR1dXZ2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhIWEhIOCgYGAfn59fHt7enh4d3d2dnZ2d3d4eXp7fH1+f4CBgoKDhIWFhoaGhoWFhIOCgYB/fn18e3p5eHd2dXV0c3N0dHR1dnd4eXp7fX5/gYGCg4SFhYaGhoaGhYWEg4KBgH9+fXx7enl4d3Z1dXRzc3N0dHV2d3h5e3x9fn+BgoOEhIWGhoaGhoaFhIOCgYF/fn18e3p5eHd2dXV0dHN0dHR1dnd4eXp7fX5/gYKDg4SFhYaGhoaGhYWEg4KBgH9+fXx7enl4d3Z1dXRzc3N0dHV2d3h5e3x9f3+BgoODhIWFhoaGhoWFhIOCgYB/fn18e3p5eHd2dnV0dHR0dHV1dnd4eXp8fX5/gIGCg4SFhYaGhoaGhYWEg4KBgH9+fXx7enl4d3Z1dXRzc3R0dHV2d3l5e3x9f3+BgoOEhIWGhoaGhoWFhISCgYB/fnx7enl4d3Z1dXRzc3N0dHV2d3h5e3x9f3+BgoOEhIWGhoaGhoWFhIOCgYB/fn18e3p5eHd2dXV0c3NzdHR1dnd4enp8fX5/gYKDhISFhoaGhoaFhYSEg4KBgH59fHt6eXh3dnV1dHNzc3R0dXZ3eHl7fH1+f4GCg4SEhYWGhoaGhYWEg4KBgH9+fXx7enl4d3Z1dXRzc3N0dHV2d3h6e3x9f3+BgoOEhIWFhoaGhoWFhISCgYB/fn18e3p5eHd2dXV0c3NzdHR1dnd4eXt8fX5/gYKDhISFhYaGhoaFhYSEg4KBgH9+fXx7enl4d3Z1dXRzc3N0dHV2eHh6e3x+f4CBgoOEhIWFhoaGhoWFhISCgYB/fn18e3p5eHd2dXV0c3NzdHR1dnd4eXt7fX5/gYGDg4SFhYaGhoaFhYSEg4KBgH9+fXx7enl4d3Z1dXRzc3N0dHV2d3h6e3x9fn+BgoOEhIWFhoaGhoWFhISCgYB/fn18e3p5eHd2dXV0c3NzdHR1dnd4eXt8fX5/gYKDhISFhYaGhoaFhYSEgoGBf359fHt6eXh3dnV1dHNzc3R0dXZ3eHp7fH1+f4GCg4SFhYaG';
    
    // 点击声
    const clickSoundBase64 = 'data:audio/wav;base64,UklGRnQGAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YU8GAACBgIF/gn6Dfn+AgIF/gn2Dfn+AgIB/gYCBfX5/gIF/gYF/f4B/f4B/gIF/gn6Dfn+Af4B+gIB/f4B/f4B/gIF/gIF/gYF/gH+Af3+AgH+Af4CBgIGAgoCBgH+AgH59fXx9fH18fX19fn9/gICBgoODg4SEhIODgoKBgH9+fXx7enl4d3Z1dHRzc3N0dHV2d3h5ent8fX6AgYKDhIWGh4iJiYqKiouKiomIh4aEg4GAfXt5dnRxbmxpZ2RiYF5cWlhaWVlaW11eYGJkZmhrbW9yc3Z4e31/goSGiYuNj5GSlJWWl5iYmJiXlpWTkpCOjIqHhIJ/fHp3dHFvbGloZWNhX11cWllaWVpbXF5fYWNmZ2ptb3F0dnh6fX+BhIaIio2OkJKTlJWWlpaWlZSSkI+Mi4iFgn98eXdzb2xpZmNgXltZV1ZVVFRUVVZXWVtdX2FkZmlrbG9xc3V3eXx+gIKEhoiKi46PkZKTlJSUlJOSkZCOjIqIhYOAfXt4dnNwbWpoZWNgXl1bWVhXVlZWVlZXWFpcXmBiZGZoam1ucHJ0dnh6fH5/gYOFhoiJi4yNjo+PkI+PjYyLioiGhIKAfnx6eHVzcW9sa2lnZWNhYF5dXFtbW1tcXV5fYGJjZWZoaWptbnBxc3R2d3l6e31+f4CBgoOEhIWFhYWFhISDgoGAf359fHt6eXh3d3Z1dXV1dXV2d3d4eXp7fH1+f4CBgoKDhISEhISEg4OCgYB/fn18e3p5eHd2dXV0dHR0dHR1dXZ3eHl6e3x9fn+AgYKCg4SEhISEhISDgoKBgH9+fXx7enl4d3Z2dXV0dHR0dXV2d3h5ent8fX6AgYGCg4SEhYWFhYWEhIOCgYCAf359fHt6eXh3d3Z1dXV1dXV2dnd4eXp7fH1+f4CBgoODhISFhYWFhISDgoKBgH9+fXx7enl4d3Z2dXV0dHR1dXZ2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhISEg4KCgYB/fn18e3p5eHd2dnV1dHR0dXV2d3h5ent8fX5/gIGCg4OEhISEhIWEhIOCgYGAfn59fHt7enh4d3d2dnZ2d3d4eXp7fH1+f4CBgoKDhIWFhoaGhoWFhIOCgYB/fn18e3p5eHd2dXV0c3N0dHR1dnd4eXp7fX5/gYGCg4SFhYaGhoaGhYWEg4KBgH9+fXx7enl4d3Z1dXRzc3N0dHV2d3h5e3x9fn+BgoOEhIWGhoaGhoaFhIOCgYF/fn18e3p5eHd2dXV0dHN0dHR1dnd4eXp7fX5/gYKDg4SFhYaGhoaGhYWEg4KBgH9+fXx7enl4d3Z1dXRzc3N0dHV2d3h5e3x9f3+BgoODhIWFhoaGhoWFhIOCgYB/fn18e3p5eHd2dnV0dHR0dHV1dnd4eXp8fX5/gIGCg4SFhYaGhoaGhYWEg4KBgH9+fXx7enl4d3Z1dXRzc3R0dHV2d3l5e3x9f3+BgoOEhIWGhoaGhoWFhISCgYB/fnx7enl4d3Z1dXRzc3N0dHV2d3h5e3x9f3+BgoOEhIWGhoaGhoWFhIOCgYB/fn18e3p5eHd2dXV0c3NzdHR1dnd4enp8fX5/gYKDhISFhoaGhoaFhYSEg4KBgH59fHt6eXh3dnV1dHNzc3R0dXZ3eHl7fH1+f4GCg4SEhYWGhoaGhYWEg4KBgH9+fXx7enl4d3Z1dXRzc3N0dHV2d3h6e3x9f3+BgoOEhIWFhoaGhoWFhISCgYB/fn18e3p5eHd2dXV0c3NzdHR1dnd4eXt8fX5/gYKDhISFhYaGhoaFhYSEg4KBgH9+fXx7enl4d3Z1dXRzc3N0dHV2eHh6e3x+f4CBgoOEhIWFhoaGhoWFhISCgYB/fn18e3p5eHd2dXV0c3NzdHR1dnd4eXt7fX5/gYGDg4SFhYaGhoaFhYSEg4KBgH9+fXx7enl4d3Z1dXRzc3N0dHV2d3h6e3x9fn+BgoOEhIWFhoaGhoWFhISCgYB/fn18e3p5eHd2dXV0c3NzdHR1dnd4eXt8fX5/gYKDhISFhYaGhoaFhYSEgoGBf359fHt6eXh3dnV1dHNzc3R0dXZ3eHp7fH1+f4GCg4SFhYaG';
    
    // 创建备用声音播放功能
    window.playEmbeddedSound = function(type = 'beep') {
        try {
            // 选择要播放的声音类型
            let soundData = type === 'click' ? clickSoundBase64 : beepSoundBase64;
            
            // 创建新的音频对象
            const audio = new Audio(soundData);
            audio.volume = 1.0;
            
            // 播放声音
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log(`嵌入式音频 ${type} 播放成功`);
                }).catch(err => {
                    console.error(`嵌入式音频 ${type} 播放失败:`, err);
                });
            }
        } catch (e) {
            console.error('嵌入式音频播放失败:', e);
        }
    };
    
    // 添加一个测试按钮
    const testButton = document.createElement('button');
    testButton.textContent = '测试嵌入式音频';
    testButton.style.position = 'fixed';
    testButton.style.bottom = '120px';
    testButton.style.left = '20px';
    testButton.style.zIndex = '9999';
    testButton.style.padding = '10px 20px';
    testButton.style.backgroundColor = '#FF9800';
    testButton.style.color = 'white';
    testButton.style.border = 'none';
    testButton.style.borderRadius = '5px';
    testButton.style.cursor = 'pointer';
    
    testButton.addEventListener('click', () => {
        console.log('测试嵌入式音频');
        window.playEmbeddedSound('click');
    });
    
    document.body.appendChild(testButton);
    
    // 劫持现有事件，添加我们的声音
    const addSoundToElements = () => {
        // 三角形点击
        const triangles = document.querySelectorAll('.triangle-top, .triangle-right, .triangle-bottom, .triangle-left');
        triangles.forEach(triangle => {
            triangle.addEventListener('click', () => {
                window.playEmbeddedSound('click');
            });
        });
        
        // 清除按钮
        const erasers = document.querySelectorAll('.block-base');
        erasers.forEach(eraser => {
            eraser.addEventListener('click', () => {
                window.playEmbeddedSound('beep');
            });
        });
        
        // 任务切换
        const questItems = document.querySelectorAll('.quest-item');
        questItems.forEach(item => {
            item.addEventListener('click', () => {
                window.playEmbeddedSound('click');
            });
        });
    };
    
    // 延迟执行以确保DOM已完全加载
    setTimeout(addSoundToElements, 1000);
});
