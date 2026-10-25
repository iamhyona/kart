import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const scope=vm.createContext({console});
vm.runInContext(fs.readFileSync('web/engine.js','utf8'),scope);
const P=vm.runInContext('PANG',scope);
for(let t=0;t<6;t++){
 const track=P.makeTrack(t);
 for(let s=0;s<track.length;s+=100){const p=track.at(s),n=track.nearest(p.x,p.z);assert.ok(n.dist<.01,'centerline projects exactly');assert.ok(Number.isFinite(p.yaw))}
 const race=new P.Race({track:t,mode:'speed',char:0,players:1});
 race.count=0;race.step(1/60,[]);
 for(let i=0;i<24000&&race.state!=='done';i++){
  const c=race.cars[0],p=track.at(c.lastS+65+Math.min(c.v*.25,80));
  let a=Math.atan2(p.x-c.x,p.z-c.z)-c.heading;a=Math.atan2(Math.sin(a),Math.cos(a));
  race.step(1/60,[{steer:P.clamp(a*2.7,-1,1),drift:Math.abs(a)>.38}]);
 }
 assert.equal(race.state,'done','player can complete track '+t);
 assert.equal(race.cars[0].lap,3);assert.ok(race.cars[0].finishTime>10);
 console.log(track.name+': 3 laps completed in '+race.cars[0].finishTime.toFixed(1)+'s');
}
const race=new P.Race({track:0,mode:'item',char:0,players:1});race.state='racing';const c=race.cars[0];
c.items=['boost','shield'];race.use(c,0);assert.equal(c.items.length,1);assert.ok(c.boost>0);
race.use(c,0);assert.ok(c.shield>0);const v=c.v=100;race.hit(c,'rocket');assert.equal(c.shield,0);assert.equal(c.v,v,'shield absorbs hit');
c.invuln=0;race.hit(c,'rocket');assert.ok(c.v<v,'unshielded rocket slows kart');
const elapsed=race.elapsed;race.state='paused';race.step(.05,[]);assert.equal(race.elapsed,elapsed,'pause freezes race');
console.log('Item consumption, shield, impact, and pause checks passed.');
