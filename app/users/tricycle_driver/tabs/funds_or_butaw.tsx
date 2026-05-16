import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, SafeAreaView,
  Platform, ActivityIndicator,
} from 'react-native';
import {
  TrendingUp, Users, Calendar, CheckCircle,
  Clock, ChevronRight,
} from 'lucide-react-native';
import { Toast } from '@/components/toast';
import { useToast } from '@/hooks/use_toast';
import { useDriverFunds } from '@/hooks/use_driver_funds';

const CRIMSON = '#7B1A1A';
const GOLD    = '#C8960C';
const BG      = '#F5EFE8';

export default function FundsOrButawScreen() {
  const { toast, hideToast } = useToast();
  const { contributions, loading, totalAmount } = useDriverFunds();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} onHide={hideToast} />

      {/* ── PAGE HEADER ── */}
      <View style={{ backgroundColor: CRIMSON, paddingHorizontal: 16,
        paddingTop: 14, paddingBottom: 16, marginTop: 30 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '800' }}>Driver Funds</Text>
        <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 2 }}>
          Stay informed · Track your contributions
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 100 : 86 }}
      >
        {/* SUBHEADER */}
        <View style={{ backgroundColor: '#fff', paddingHorizontal: 16,
          paddingTop: 20, paddingBottom: 16 }}>
          <Text style={{ fontSize: 26, fontWeight: '900', color: CRIMSON,
            lineHeight: 32, marginBottom: 4 }}>
            Community Fees &{'\n'}Records
          </Text>
          <Text style={{ fontSize: 13, color: '#6B6059' }}>Verified Member</Text>
        </View>

        {/* TOTAL FUNDS CARD */}
        <View style={{ margin: 16, marginTop: 8, borderRadius: 16,
          padding: 16, backgroundColor: CRIMSON }}>
          <Text style={{ fontSize: 10, fontWeight: '700', letterSpacing: 2,
            marginBottom: 8, color: 'rgba(255,255,255,0.7)' }}>
            YOUR TOTAL CONTRIBUTIONS
          </Text>
          <Text style={{ fontSize: 28, fontWeight: '900', color: '#fff', marginBottom: 8 }}>
            {loading
              ? '...'
              : `₱${totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Users size={13} color="rgba(255,255,255,0.7)" />
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
              {contributions.length > 0
                ? `${contributions.length} contribution${contributions.length > 1 ? 's' : ''} recorded`
                : 'No contributions recorded yet'}
            </Text>
          </View>
        </View>

        {/* BUTAW TOTAL */}
        <View style={{ backgroundColor: '#fff', paddingHorizontal: 16,
          paddingVertical: 20, marginTop: 8 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', letterSpacing: 2,
            marginBottom: 4, color: '#A89880' }}>
            YOUR MONTHLY BUTAW TOTAL
          </Text>
          <Text style={{ fontSize: 34, fontWeight: '900', marginBottom: 8, color: CRIMSON }}>
            {loading
              ? '...'
              : `₱${totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <TrendingUp size={13} color={contributions.length > 0 ? GOLD : '#C4B9AE'} />
            <Text style={{ fontSize: 13, fontWeight: '600',
              color: contributions.length > 0 ? GOLD : '#C4B9AE' }}>
              {contributions.length > 0
                ? `${contributions.length} payment${contributions.length > 1 ? 's' : ''} made`
                : 'No contributions yet'}
            </Text>
          </View>
        </View>

        {/* CONTRIBUTIONS LOG */}
        <View style={{ backgroundColor: '#fff', paddingHorizontal: 16,
          paddingVertical: 20, marginTop: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#1A1A1A' }}>
              Contribution Log
            </Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: GOLD }}>View All</Text>
              <ChevronRight size={14} color={GOLD} />
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={{ alignItems: 'center', paddingVertical: 24 }}>
              <ActivityIndicator color={CRIMSON} />
              <Text style={{ color: '#C4B9AE', fontSize: 12, marginTop: 8 }}>
                Loading contributions...
              </Text>
            </View>
          ) : contributions.length === 0 ? (
            <View style={{ alignItems: 'center', paddingVertical: 24 }}>
              <Calendar size={32} color="#C4B9AE" />
              <Text style={{ color: '#C4B9AE', fontWeight: '700',
                fontSize: 13, marginTop: 8 }}>
                No contributions yet
              </Text>
              <Text style={{ color: '#C4B9AE', fontSize: 11, marginTop: 4, textAlign: 'center' }}>
                Contributions recorded by the admin will appear here
              </Text>
            </View>
          ) : (
            contributions.map((item, idx) => (
              <View key={item.id ?? idx} style={{
                flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12,
                borderBottomWidth: idx !== contributions.length - 1 ? 1 : 0,
                borderBottomColor: '#EDE7DE',
              }}>
                <View style={{ width: 36, height: 36, borderRadius: 8,
                  alignItems: 'center', justifyContent: 'center',
                  backgroundColor: '#F0E8E4' }}>
                  <Calendar size={16} color={CRIMSON} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#1A1A1A' }}>
                    {item.date}
                  </Text>
                  <Text style={{ fontSize: 11, color: '#6B6059' }}>
                    { item.notes ?? 'Contribution'}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#1A1A1A' }}>
                    ₱{Number(item.amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </Text>
                  <View style={{
                    flexDirection: 'row', alignItems: 'center', gap: 4,
                    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4,
                    backgroundColor: item.status === 'paid' ? '#DCFCE7' : '#FEF9C3',
                  }}>
                    {item.status === 'paid'
                      ? <CheckCircle size={10} color="#16A34A" />
                      : <Clock size={10} color="#F59E0B" />}
                    <Text style={{
                      fontSize: 10, fontWeight: '700',
                      color: item.status === 'paid' ? '#16A34A' : '#D97706',
                    }}>
                      {item.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}