"""Prepare selected licensed recordings; requires numpy + soundfile.
Download pack URLs in audio/CREDITS.md into audio/source before running.
Output is mono 22.05 kHz PCM for portable, dependency-free offline decoding.
"""
import json, sys
from pathlib import Path
import numpy as np
import soundfile as sf

root = Path(__file__).resolve().parents[1]
src, out = root/'audio/source', root/'audio/bank'
out.mkdir(exist_ok=True, parents=True)
manifest = {}
def clip(name, filename, start=0, end=None):
    x, rate = sf.read(src/filename)
    if x.ndim > 1: x = x.mean(axis=1)
    x = x[int(start*rate):int(end*rate) if end else len(x)]
    active = np.flatnonzero(np.abs(x) > .006)
    if len(active): x=x[max(0,active[0]-int(rate*.006)):min(len(x),active[-1]+int(rate*.07))]
    x=np.interp(np.arange(0,len(x),rate/22050),np.arange(len(x)),x)
    peak=np.max(np.abs(x))
    if peak: x=x*.88/peak
    n=min(11,len(x)//4)
    x[:n]*=np.linspace(0,1,n);x[-n:]*=np.linspace(1,0,n)
    x *= .88 / max(.00001,np.max(np.abs(x)))
    sf.write(out/(name+'.wav'),x,22050,subtype='PCM_16')
    manifest[name]={'file':name+'.wav','seconds':round(len(x)/22050,4),'source':filename,'excerpt':[start,end]}
for name in ['pistol','rifle','shotgun']: clip(name,'shots/'+name+'.wav')
clip('reload-pistol','gunreload1.wav')
clip('reload-carbine','assaultriflereload1_0.wav')
clip('rack','shotguncock_0.wav')
clip('shell','gunreload1.wav',.25,.53)
clip('latch','assaultriflereload1_0.wav',.08,.26)
clip('door-open','iron_door_0.ogg',0,3)
for n,(a,b) in enumerate([(0,3.1),(3.4,6.4),(6.5,9.2),(9.3,11.5),(11.5,14.6),(14.7,15.81)]):
    clip('groan'+str(n),'darsycho__zombie-moans_0.ogg',a,b)
for name,source in [('door-close','impactMetal_heavy_000'),('door-bash','impactPlate_heavy_001'),('hit','impactPunch_heavy_000'),('body','impactSoft_heavy_000'),('glass','impactGlass_heavy_000'),('gear','impactSoft_medium_001'),('metal','impactMetal_light_001'),('switch','impactGeneric_light_000')]:
    clip(name,'Audio/'+source+'.ogg')
for n in range(3):
    clip('step'+str(n),'Audio/footstep_concrete_00'+str(n)+'.ogg')
    clip('metalstep'+str(n),'Audio/impactPlate_light_00'+str(n)+'.ogg')
    clip('splash'+str(n),'ezwa-water_splash/water_splash-0'+str(n+1)+'.flac',0,.8)
(root/'audio/manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(len(manifest),'clips,',sum(f.stat().st_size for f in out.glob('*.wav')),'bytes')
